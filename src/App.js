import {Component} from 'react';

import {Articles, Search, Button} from './ArticlesSubcomponents';
// import logo from './logo.svg';
import './App.css';

const API_URL = 'https://hn.algolia.com/api/v1';
const API_SEARCH = `${API_URL}/search`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      error: null,
      queryFilter: '',
      querySearch: '',
    };
  }

  componentDidMount = () => {
    this.collectArticles();
  };

  collectArticles = async (page = 0) => {
    const {results, querySearch} = this.state;
    const cachedResult = results[querySearch];

    if (cachedResult && cachedResult.page >= page) {
      return;
    }

    return fetch(`${API_SEARCH}?query=${querySearch}&page=${page}`).then(response => response.json())
      .then(({hits, page}) => this.setState({results: {
        ...results,
        [querySearch]: {page, hits: [
          ...cachedResult?.hits || [],
          ...hits,
        ]},
      }}))
      .catch(error => this.setState({error}));
  }

  render = () => {
    const {results, queryFilter, querySearch, error} = this.state;
    const articles = results[querySearch]?.hits || [];

    return (
      <div className="page">
        <h2 className="page-header">Hacker News</h2>
        <aside className="interactions">
          <Search 
            query={querySearch}
            onFilter={this.onFilter}
            onRefresh={this.onRefresh}
          />
        </aside>
        {error ?
          <p className="centered">При запросе статей произошла ошибка: {error.message}</p> :
          <main className="articles">
            <Articles
              articles={articles}
              query={queryFilter}
              onRemoveArticle={this.removeArticle}
            />
            <Button onClick={this.moreArticles}>
              Показать больше
            </Button>
          </main>
        }
      </div>
    );
  }

  onFilter = queryFilter => () => this.setState({queryFilter});
  onRefresh = querySearch => () => this.setState({querySearch}, () => {
    this.collectArticles().then(() => this.setState({queryFilter: ''}));
  });

  moreArticles = () => {
    const {results, querySearch} = this.state;
    this.collectArticles(results[querySearch].page + 1);
  }

  removeArticle = deleteId => () => {
    const {results, querySearch} = this.state;
    const oldHits = results[querySearch].hits;

    this.setState({results: {
      ...results,
      [querySearch]: {
        ...results[querySearch],
        hits: oldHits.filter(({objectID}) => deleteId !== objectID),
      },
    }});
  }
}

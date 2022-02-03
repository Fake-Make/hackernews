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
      result: {},
      error: null,
      queryFilter: '',
      querySearch: '',
    };
  }

  componentDidMount = () => {
    this.collectArticles();
  };

  collectArticles = async (page = 0) => {
    return fetch(`${API_SEARCH}?query=${this.state.querySearch}&page=${page}`).then(response => response.json())
      .then(result => {
        const hits = [...this.state.result.hits || [], ...result.hits];
        this.setState({result: {...result, hits, page}});
      })
      .catch(error => this.setState({error}));
  }

  render = () => (
    <div className="page">
      <h2 className="page-header">Hacker News</h2>
      <aside className="interactions">
      <Search 
        query={this.state.querySearch}
        onFilter={this.onFilter}
        onRefresh={this.onRefresh}
      />
      </aside>
      <Articles
        articles={this.state.result?.hits || []}
        query={this.state.queryFilter}
        onRemoveArticle={this.removeArticle}
      />
      <Button
        onClick={this.moreArticles}
        className="centered"
      >Показать больше</Button>
    </div>
  );

  onFilter = queryFilter => () => this.setState({queryFilter});
  onRefresh = querySearch => () => this.setState({querySearch}, () => {
    this.collectArticles().then(() => this.setState({queryFilter: ''}));
  });

  moreArticles = () => {
    this.collectArticles(this.state.result.page + 1);
  }

  removeArticle = deleteId => () => this.setState({result: {
    ...this.state.result,
    hits: this.state.result?.hits.filter(({objectID}) => deleteId !== objectID),
  }});
}

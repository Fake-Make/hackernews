import {Component} from 'react';

import {Articles, Search} from './ArticlesSubcomponents';
// import logo from './logo.svg';
import './App.css';

const API_URL = 'https://hn.algolia.com/api/v1';
const API_SEARCH = `${API_URL}/search`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      error: null,
      query: '',
    };
  }

  componentDidMount = () => {
    this.collectArticles();
  };

  collectArticles = () => {
    fetch(`${API_SEARCH}?query=${this.state.query}`).then(response => response.json())
      .then(({hits: articles}) => this.setState({articles}))
      .catch(error => this.setState({error}));
  }

  render = () => (
    <div className="page">
      <h2 className="page-header">Hacker News</h2>
      <aside className="interactions">
      <Search 
        query={this.state.query}
        onQueryChange={this.onQueryChange}
      />
      </aside>
      <Articles
        articles={this.state.articles}
        query={this.state.query}
        onRemoveArticle={this.removeArticle}
      />
    </div>
  );

  onQueryChange = ({target}) => {
    this.setState({query: target.value.toString().toLocaleLowerCase()});
  };

  removeArticle = deleteId => () => this.setState({
    articles: this.state.articles.filter(({objectID}) => deleteId !== objectID)
  });
}

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
      result: {},
      error: null,
      query: '',
    };
  }

  componentDidMount = () => {
    this.collectArticles();
  };

  collectArticles = () => {
    fetch(`${API_SEARCH}?query=${this.state.query}`).then(response => response.json())
      .then(result => this.setState({result}))
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
        articles={this.state.result?.hits || []}
        query={this.state.query}
        onRemoveArticle={this.removeArticle}
      />
    </div>
  );

  onQueryChange = ({target}) => {
    this.setState({query: target.value.toString().toLocaleLowerCase()});
  };

  removeArticle = deleteId => () => this.setState({result: {
    ...this.state.result,
    hits: this.state.result?.hits.filter(({objectID}) => deleteId !== objectID),
  }});
}

import {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Article from './Article';

const articles = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    id: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    id: 1,
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles,
      query: '',
    };
  }

  render = () => (
    <div className="App">
      <h2>Title</h2>
      <form>
        <input type="text" onChange={this.onQueryChange} />
      </form>
      <ul>{
        this.state.articles
          .filter(this.isArticleMatchQuery)
          .map(this.renderArticle)
      }</ul>
    </div>
  )

  onQueryChange = ({target}) => {
    this.setState({query: target.value.toString().toLocaleLowerCase()});
  }

  isArticleMatchQuery = ({title}) => {
    return title.toLocaleLowerCase().includes(this.state.query);
  }

  renderArticle = article => (
    <li key={article.id}>
      <Article article={article} />
      <div>
        <button onClick={this.removeArticle(article.id)} type="button">
          Удалить
        </button>
      </div>
    </li>
  )

  removeArticle = deleteId => () => this.setState({
    articles: this.state.articles.filter(({id}) => deleteId !== id)
  })
}

import {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

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
      <h2>Hacker News</h2>
      <Search 
        query={this.state.query}
        onQueryChange={this.onQueryChange}
      />
      <Articles
        articles={this.state.articles}
        query={this.state.query}
        onRemoveArticle={this.removeArticle}
      />
    </div>
  )

  onQueryChange = ({target}) => {
    this.setState({query: target.value.toString().toLocaleLowerCase()});
  }

  isArticleMatchQuery = ({title}) => {
    return title.toLocaleLowerCase().includes(this.state.query);
  }

  removeArticle = deleteId => () => this.setState({
    articles: this.state.articles.filter(({id}) => deleteId !== id)
  })
}

class Search extends Component {
  render = () => (
    <form>
      <input
        value={this.props.query}
        onChange={this.props.onQueryChange}
      />
    </form>
  );
}

class Articles extends Component {
  isArticleMatchQuery = ({title}) =>
    title.toLocaleLowerCase().includes(this.props.query.toLocaleLowerCase());

  render = () => {
    return (
      <ul>{
        this.props.articles
          .filter(this.isArticleMatchQuery)
          .map(this.renderArticle)
      }</ul>
    );
  }

  renderArticle = article => (
    <li key={article.id}>
      <header>
        <a href={article.url}>{article.title}</a>
        <i>({article.author})</i>
      </header>
      <main>
        {article.content || ''}
      </main>
      <aside>
        <i style={{marginRight: 5}}>Comments: {article.num_comments}</i>
        <i>Points: {article.points} of 5</i>
      </aside>
      <footer>
        <button onClick={this.props.onRemoveArticle(article.id)} type="button">
          Удалить
        </button>
      </footer>
    </li>
  );
}

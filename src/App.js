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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {articles};
    // this.defineInterval();
  }

  render() {
    return (
      <div className="App">
        <h2>Title</h2>
        <ul>{this.renderArticles()}</ul>
      </div>
    );
  }

  renderArticles() {
    return this.state.articles.map(article => (
      <li key={article.id}>
        <div>
          <a href={article.url}>article.title</a>
          <i>({article.author})</i>
        </div>
        <div>
          <i style={{marginRight: 5}}>Comments: {article.num_comments}</i>
          <i>Points: {article.points} of 5</i>
        </div>
        <div>
          <button onClick={() => this.removeArticle(article.id)} type="button">
            Удалить
          </button>
        </div>
      </li>
    ));
  }

  removeArticle(id) {
    const articles = this.state.articles.filter(({id: articleId}) => articleId !== id);
    this.setState({articles});
  }

  defineInterval() {
    console.debug('Interval defined');
    setInterval(() => {
      const articles = this.state.articles;
      articles[0].points = Math.round(Math.random() * 5);
      this.setState({articles});

      console.debug('State refreshed, new points:', articles[0].points);
    }, 10e3);
  }
}

export default App;

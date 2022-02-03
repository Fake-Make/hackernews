import {Component} from 'react';
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

const Search = ({query, onQueryChange}) => (
  <form>
    <input value={query} onChange={onQueryChange} placeholder="Поиск"/>
  </form>
);

const isArticleMatchQuery = query => ({title}) =>
  title?.toLocaleLowerCase().includes(query.toLocaleLowerCase());

const renderArticle = onRemoveArticle => article => (
  <li key={article.objectID} className="article">
    <header className="article-header">
      <a href={article.url}>{article.title}</a> <i>({article.author})</i>
    </header>
    <main className="article-content">
      {article.content || ''}
    </main>
    <aside>
      <p><i style={{marginRight: 5}}>Комментариев: {article.num_comments}</i></p>
      <p><i>Рейтинг: {article.points}</i></p>
    </aside>
    <footer>
      <Button onClick={onRemoveArticle(article.objectID)}>
        Удалить
      </Button>
    </footer>
  </li>
);

const Articles = ({articles, query, onRemoveArticle}) => {
  const renderedArticles = articles
    .filter(isArticleMatchQuery(query))
    .map(renderArticle(onRemoveArticle));

  return renderedArticles.length ?
    <ul className="articles">{renderedArticles}</ul> :
    <p className="articles"><i>Нет доступных статей</i></p>;
}

const Button = ({onClick, className = '', children}) =>
  <button onClick={onClick} className={className}>{children}</button>;

import {Component} from 'react';

export class Search extends Component {
  constructor(props) {
    super(props);

    const {query} = props;
    this.state = {query};
  }

  onQueryChange = ({target}) => {
    this.setState({query: target.value.toLocaleLowerCase()});
  }

  render = () => (
    <form>
      <input value={this.state.query} onChange={this.onQueryChange} placeholder="Поиск"/>
      <Button
        onClick={this.props.onFilter(this.state.query)}
        className="lh-16"
        title="Фильтровать"
      >🔍</Button>
      <Button
        onClick={this.props.onRefresh(this.state.query)}
        className="lh-16"
        title="Обновить"
      >🗘</Button>
    </form>
  );
}

const isArticleMatchQuery = queryInLowerCase => ({title}) =>
  title?.toLocaleLowerCase().includes(queryInLowerCase);

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

export const Articles = ({articles, query, onRemoveArticle}) => {
  const renderedArticles = articles
    .filter(isArticleMatchQuery(query))
    .map(renderArticle(onRemoveArticle));

  return renderedArticles.length ?
    <ul className="articles">{renderedArticles}</ul> :
    <p className="articles"><i>Нет доступных статей</i></p>;
}

export const Button = ({onClick, className = '', title = '', children}) =>
  <button onClick={onClick} className={className} title={title} type="button">{children}</button>;

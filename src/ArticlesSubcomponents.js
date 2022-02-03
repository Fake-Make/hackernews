export const Search = ({query, onQueryChange}) => (
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

export const Articles = ({articles, query, onRemoveArticle}) => {
  const renderedArticles = articles
    .filter(isArticleMatchQuery(query))
    .map(renderArticle(onRemoveArticle));

  return renderedArticles.length ?
    <ul className="articles">{renderedArticles}</ul> :
    <p className="articles"><i>Нет доступных статей</i></p>;
}

export const Button = ({onClick, className = '', children}) =>
  <button onClick={onClick} className={className}>{children}</button>;

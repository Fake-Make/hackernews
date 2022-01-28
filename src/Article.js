import {Component} from 'react';

export default class Article extends Component {
  constructor(props) {
    super(props);

    this.article = this.props.article;
  }

  render = () => (
    <div>
      <header>
        <a href={this.article.url}>{this.article.title}</a>
        <i>({this.article.author})</i>
      </header>
      <main>
        {this.article.content || ''}
      </main>
      <aside>
        <i style={{marginRight: 5}}>Comments: {this.article.num_comments}</i>
        <i>Points: {this.article.points} of 5</i>
      </aside>
    </div>
  )
}

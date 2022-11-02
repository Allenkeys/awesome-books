export default class Book {
  constructor(title, author, id = Math.random()) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

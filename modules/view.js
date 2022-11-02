import Book from './book.js';

import { addToLocalStorage, getFromLocalStorage } from './helpers.js';

export default class Render {
  static collections = [];

  static addBookToCollection = (title, author) => {
    const book = new Book(title, author);
    this.collections = this.collections.concat(book);
    addToLocalStorage(this.collections);
    return this.collections;
  }

  static template = (book) => `<div> "${book.title}" by ${book.author} </div>
      <button data-id=${book.id} class="remove">Remove</button>`

  static displayBooks = () => {
    const getLocalData = getFromLocalStorage('books');
    this.collections = getLocalData;
    const bookSection = document.querySelector('.books-section');
    bookSection.replaceChildren();
    this.collections.forEach((book) => {
      const singleBook = document.createElement('div');
      singleBook.classList.add('book-container');
      singleBook.innerHTML = Render.template(book);
      bookSection.appendChild(singleBook);
    });
    Render.removeBookFromCollection();
  }

  static removeBookFromCollection = () => {
    const removeBtn = document.querySelectorAll('.remove');
    removeBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        this.collections = this.collections.filter(
          (el) => el.id !== Number(id),
        );
        addToLocalStorage(this.collections);
        Render.displayBooks();
      });
    });
  }
}

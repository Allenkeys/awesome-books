/* eslint-disable max-classes-per-file */
const addToLocalStorage = (data) => localStorage.setItem('books', JSON.stringify(data));

const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

class Book {
  constructor(title, author, id = Math.random()) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Render {
  static collections = [];

  static addBookToCollection(title, author) {
    const book = new Book(title, author);
    this.collections = this.collections.concat(book);
    addToLocalStorage(this.collections);
    return this.collections;
  }

  static displayBooks() {
    const getLocalData = getFromLocalStorage('books');
    this.collections = getLocalData;
    const bookSection = document.querySelector('.books-section');
    bookSection.replaceChildren();
    this.collections.forEach((book) => {
      const singleBook = document.createElement('div');
      singleBook.classList.add('book-container');
      singleBook.innerHTML = `<div> "${book.title}" by ${book.author} </div>
      <button data-id=${book.id} class="remove">Remove</button>`;
      bookSection.appendChild(singleBook);
    });
    Render.removeBookFromCollection();
  }

  static removeBookFromCollection() {
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

const form = document.getElementById('book-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.elements.title.value;
  const author = form.elements.author.value;
  if (!title || !author) {
    return;
  }
  Render.addBookToCollection(title, author);

  Render.displayBooks();
  form.reset();
});

if (localStorage.getItem('books')) {
  Render.displayBooks();
}

const pop = document.querySelectorAll('.pop');

for (let i = 0; i < pop.length; i += 1) {
  if (i > 0) {
    pop[i].style.display = 'none';
  }
}
const title = document.querySelector('.title');
const nav = document.querySelectorAll('.nav-item');

const read = (e) => {
  const target = e.target.innerText;
  if (target === 'List') {
    pop[0].style.display = 'block';
    pop[1].style.display = 'none';
    pop[2].style.display = 'none';
    title.style.display = 'block';
  } else if (target === 'Add New') {
    pop[0].style.display = 'none';
    pop[1].style.display = 'block';
    pop[2].style.display = 'none';
    title.style.display = 'none';
  } else {
    pop[0].style.display = 'none';
    pop[1].style.display = 'none';
    pop[2].style.display = 'block';
    title.style.display = 'none';
  }
};

nav.forEach((link) => {
  link.addEventListener('click', (e) => read(e));
});

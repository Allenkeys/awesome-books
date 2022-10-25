function addToLocalStorage(data) {
  return localStorage.setItem('books', JSON.stringify(data));
}

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

let collections = [];

function addBookToCollection(title, author) {
  const id = Math.random();
  collections.push({ title, author, id });
  addToLocalStorage(collections);
  return collections;
}

function displayBooks() {
  const getLocalData = getFromLocalStorage('books');
  collections = getLocalData;
  const bookSection = document.querySelector('.books-section');
  bookSection.replaceChildren();
  collections.forEach((book) => {
    const singleBook = document.createElement('div');
    singleBook.innerHTML = `<div>${book.title}</div>
        <div>${book.author}</div>
        <button data-id=${book.id} class='remove'>Remove</button>
        <hr>`;
    bookSection.appendChild(singleBook);
  });
  /* eslint-disable no-use-before-define */
  removeBookFromCollection();
}
function removeBookFromCollection() {
  const removeBtn = document.querySelectorAll('.remove');
  removeBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      collections = collections.filter((el) => el.id !== Number(id));
      addToLocalStorage(collections);
      displayBooks();
    });
  });
}

const form = document.getElementById('book-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.elements.title.value;
  const author = form.elements.author.value;
  if (!title || !author) {
    return;
  }

  addBookToCollection(title, author);

  displayBooks();
  form.reset();
});

if (localStorage.getItem('books')) {
  displayBooks();
}

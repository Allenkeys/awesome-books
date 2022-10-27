const addToLocalStorage = (data) =>
  localStorage.setItem("books", JSON.stringify(data));

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
    const getLocalData = getFromLocalStorage("books");
    this.collections = getLocalData;
    const bookSection = document.querySelector(".books-section");
    bookSection.replaceChildren();
    this.collections.forEach((book) => {
      const singleBook = document.createElement("div");
      singleBook.classList.add("book-container");
      singleBook.innerHTML = `<div>"${book.title}" by</div>
        <div class='author'> ${book.author}</div>
        <button data-id=${book.id} class='remove'>Remove</button>`;
      bookSection.appendChild(singleBook);
    });
    Render.removeBookFromCollection();
  }

  static removeBookFromCollection() {
    const removeBtn = document.querySelectorAll(".remove");
    removeBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        this.collections = this.collections.filter(
          (el) => el.id !== Number(id)
        );
        addToLocalStorage(this.collections);
        Render.displayBooks();
      });
    });
  }
}

const form = document.getElementById("book-form");

form.addEventListener("submit", (e) => {
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

if (localStorage.getItem("books")) {
  Render.displayBooks();
}

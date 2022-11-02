import Render from './modules/view.js';
import { DateTime } from './modules/luxon.js';

const nav = document.querySelectorAll('.nav-item');
const title = document.querySelector('.title');
const form = document.getElementById('book-form');
const time = document.getElementById('time');
const pop = document.querySelectorAll('.pop');

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

for (let i = 0; i < pop.length; i += 1) {
  if (i > 0) {
    pop[i].style.display = 'none';
  }
}

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

setInterval(() => {
  const date = DateTime.now();
  time.innerHTML = date.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
}, 1000);

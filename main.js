const form = document.getElementById('book-form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = form.elements['title'].value;
    const author = form.elements['author'].value;
    const collections = [];
    collections.push({title, author});

    console.log(collections);
});
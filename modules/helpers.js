const addToLocalStorage = (data) => localStorage.setItem('books', JSON.stringify(data));

const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export { addToLocalStorage, getFromLocalStorage };
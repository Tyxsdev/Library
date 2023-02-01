const myLibrary = [];
const booksDiv = document.querySelectorAll('.book');
const button = document.querySelector('button');
const section = document.querySelector('section');
const bookPlaceHolder = [...booksDiv];
let deleteButtons;

function Toggle() {}

Toggle.prototype.changeStatus = function () {
  console.log(this.read);
};

function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title}, by ${author}, ${pages} pages, ${read}.`;
  };
}

Books.prototype = Object.create(Toggle.prototype);

const a = new Books('s', 'as', 25, 'sa');
console.log(a.changeStatus());

function addBookToLibrary(book) {
  myLibrary.push(book);
  if (bookPlaceHolder.length < myLibrary.length) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('book');
    section.appendChild(newDiv);
    bookPlaceHolder.push(newDiv);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    bookPlaceHolder[i].dataset.index = `${i}`;
    if (bookPlaceHolder[i].textContent === '') {
      bookPlaceHolder[i].textContent = myLibrary[i];
      const remove = document.createElement('button');
      remove.textContent = 'Delete book';
      remove.classList.add('delete');
      bookPlaceHolder[i].insertAdjacentElement('beforeend', remove);
      deleteButtons = document.querySelectorAll('.delete');
      deleteButtons.forEach((e) => e.addEventListener('click', deleteBook));
      break;
    }
  }
}

function getForm(e) {
  event.preventDefault();
  const form = document.querySelector('form');
  const title = form.querySelector('#title');
  const author = form.querySelector('#author');
  const pages = form.querySelector('#pages');
  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  let statusValue;
  if (form.querySelector('#read').checked) {
    statusValue = form.querySelector('#read').value;
  } else if (form.querySelector('#in-progress').checked) {
    statusValue = form.querySelector('#in-progress').value;
  } else if (form.querySelector('#not-read').checked) {
    statusValue = form.querySelector('#not-read').value;
  }
  const newBook = new Books(titleValue, authorValue, pagesValue, statusValue);
  addBookToLibrary(newBook.info());
  title.value = '';
  author.value = '';
  pages.value = '';
}
button.addEventListener('click', getForm);

function deleteBook(e) {
  const index = e.target.parentNode.dataset;
  e.target.parentNode.textContent = '';
  myLibrary.splice(index, 1);
}

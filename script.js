const myLibrary = [];
const bookDivs = document.querySelectorAll('.book');
const arrayOfDivs = [...bookDivs];
const paragraph = document.querySelectorAll('.book p');
const button = document.querySelector('button');
const section = document.querySelector('section');
const bookPlaceHolder = [...paragraph];
let deleteButtons;

function Toggle() {}

Toggle.prototype.changeStatus = function () {
  return (this.read = `finish`);
};

function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title}, by ${author}, ${pages} pages, ${read}. `;
  };
}

Books.prototype = Object.create(Toggle.prototype);

function addBookToLibrary(text, book) {
  myLibrary.push(text);
  if (bookPlaceHolder.length < myLibrary.length) {
    const newDiv = document.createElement('div');
    const newP = document.createElement('p');
    newDiv.classList.add('book');
    newDiv.appendChild(newP);
    section.appendChild(newDiv);
    bookPlaceHolder.push(newP);
    arrayOfDivs.push(newDiv);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    bookPlaceHolder[i].dataset.index = `${i}`;
    if (bookPlaceHolder[i].textContent === '') {
      bookPlaceHolder[i].textContent = myLibrary[i];
      const remove = document.createElement('button');
      const update = document.createElement('button');
      remove.textContent = 'Delete book';
      remove.classList.add('delete');
      update.textContent = 'Finished';
      update.classList.add('update');
      arrayOfDivs[i].appendChild(remove);
      arrayOfDivs[i].appendChild(update);
      remove.addEventListener('click', deleteBook);

      update.addEventListener('click', (x) => {
        const textArray = bookPlaceHolder[i].textContent.split(', ');
        textArray[3] = book.changeStatus();
        bookPlaceHolder[i].textContent = `${textArray.join(', ')}.`;
      });
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
  addBookToLibrary(newBook.info(), newBook);
  title.value = '';
  author.value = '';
  pages.value = '';
}
button.addEventListener('click', getForm);

function deleteBook(e) {
  console.log('a');
  const index = e.target.parentNode.dataset;
  e.target.previousElementSibling.textContent = '';
  e.target.nextElementSibling.remove();
  e.target.remove();
  myLibrary.splice(index, 1);
}

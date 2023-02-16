const myLibrary = [];
const bookDivs = document.querySelectorAll('.book');
const arrayOfDivs = [...bookDivs];
const paragraph = document.querySelectorAll('.book p');
const button = document.querySelector('button');
const bookContainer = document.querySelector('.books-container');
const bookPlaceHolder = [...paragraph];

class Books {
  constructor(_title, _author, _pages, _status) {
    this.title = _title;
    this.author = _author;
    this.pages = _pages;
    this.status = _status;
  }

  info = () =>
    `${this.title}, by ${this.author}, ${this.pages} pages, ${this.status}. `;

  changeStatus(newStatus) {
    this.status = newStatus;
  }
}

function addBookToLibrary(book) {
  if (bookContainer.textContent === 'Sooooooo empty') {
    bookContainer.textContent = '';
  }
  myLibrary.push(book);
  if (bookPlaceHolder.length < myLibrary.length) {
    const newDiv = document.createElement('div');
    const newP = document.createElement('p');
    const newButtonContainer = document.createElement('div');
    newButtonContainer.classList.add('buttons');
    newDiv.classList.add('book');
    newP.setAttribute('style', 'white-space: pre;');
    newDiv.appendChild(newP);
    newDiv.appendChild(newButtonContainer);
    bookContainer.appendChild(newDiv);
    bookPlaceHolder.push(newP);
    arrayOfDivs.push(newDiv);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    bookPlaceHolder[i].dataset.index = `${i}`;
    if (bookPlaceHolder[i].textContent === '') {
      bookPlaceHolder[i].textContent = `Title: ${book.title} \r\n`;
      bookPlaceHolder[i].textContent += `Author: ${book.author}\r\n`;
      bookPlaceHolder[i].textContent += `Number of pages: ${book.pages}\r\n`;
      bookPlaceHolder[i].textContent += `Lecture: ${book.status}`;
      const remove = document.createElement('button');
      const update = document.createElement('button');
      const buttonContainer = arrayOfDivs[i].querySelector('div');
      remove.textContent = 'Delete book';
      remove.classList.add('delete');
      update.textContent = 'Finished';
      update.classList.add('update');
      buttonContainer.appendChild(remove);
      buttonContainer.appendChild(update);
      remove.addEventListener('click', deleteBook);

      update.addEventListener('click', () => {
        book.changeStatus('Finished');
        bookPlaceHolder[i].textContent = `Title: ${book.title} \r\n`;
        bookPlaceHolder[i].textContent += `Author: ${book.author}\r\n`;
        bookPlaceHolder[i].textContent += `Number of pages: ${book.pages}\r\n`;
        bookPlaceHolder[i].textContent += `Lecture: ${book.status}`;
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
  if (
    titleValue === null ||
    titleValue === '' ||
    authorValue === null ||
    authorValue === '' ||
    pagesValue === null ||
    pagesValue === '' ||
    statusValue === undefined ||
    statusValue === ''
  ) {
    title.value = '';
    author.value = '';
    pages.value = '';
    return;
  }
  const newBook = new Books(titleValue, authorValue, pagesValue, statusValue);
  addBookToLibrary(newBook);
  title.value = '';
  author.value = '';
  pages.value = '';
}
button.addEventListener('click', getForm);

function deleteBook(e) {
  const index = e.target.parentNode.parentNode.dataset;
  e.target.parentElement.previousElementSibling.remove();
  e.target.nextElementSibling.remove();
  e.target.parentNode.parentNode.remove();
  myLibrary.splice(index, 1);
  arrayOfDivs.splice(index, 1);
  bookPlaceHolder.splice(index, 1);
  e.target.remove();
  if (arrayOfDivs.length === 0) {
    bookContainer.textContent = 'Sooooooo empty';
  }
}

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static addBookToList(book) {
        const list = document.getElementById('book-list');
        //create element
        const row = document.createElement('tr');
        //insert
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

        list.appendChild(row);
    }

    static showAlert(msg, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        const message = document.createTextNode(msg);
        div.appendChild(message)
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }


    static clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    static deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

class Store {
    static getBooks() {
        return localStorage.getItem('books') === null ? [] : JSON.parse(localStorage.getItem('books'))
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(book => {
            UI.addBookToList(book);
        });
    }

    static addBook(book) {
        const  books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        const newBooks = books.filter((book) => book.isbn !== isbn);
        localStorage.setItem('books', JSON.stringify(newBooks));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners
document.getElementById('book-form').addEventListener('submit', e => {
    // get from value
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //console.log(title, author, isbn);

    const book = new Book(title, author, isbn);

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please Fill in All Fields", 'error')
    } else {
        UI.addBookToList(book);
        Store.addBook(book);
        UI.clearFields();
        UI.showAlert('Book Added', 'success')
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', e => {
    UI.deleteBook(e.target);

    const isbn = e.target.parentElement.previousElementSibling.textContent;
    Store.removeBook(isbn);

    UI.showAlert('Book Removed!', 'success');

    e.preventDefault();
});
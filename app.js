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
        UI.clearFields();
        UI.showAlert('Book Added', 'success')
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', e => {
    UI.deleteBook(e.target);

    UI.showAlert('Book Removed!', 'success');

    e.preventDefault();
});
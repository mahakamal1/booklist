//using es5
const form = document.querySelector('#bookslist');
// function book(bookName ,author , isbn){
//     this.bookName = bookName;
//     this.author = author;
//     this.isbn = isbn;
// }

// function uis(){}
// uis.prototype.addBook = function(b){
//     const tableBody = document.getElementById('books');
//     const row = document.createElement('tr');
//     row.innerHTML = `
//         <td> ${b.bookName} </td>
//         <td> ${b.author} </td>
//         <td> ${b.isbn} </td>
//         <td> <a class="delete" href="#">Delete</a> </td>
//     `
//     tableBody.appendChild(row);
// }

// uis.prototype.clears = function(){
//     document.getElementById('book-name').value = '';
//     document.getElementById('book-author').value = '';
//     document.getElementById('ISBN').value = '';
// }
// uis.prototype.showAlert = function(message , classN){
//     const div = document.createElement('div');
//     div.className = `alert ${classN}`;
//     div.appendChild(document.createTextNode(message));
//     const r = document.querySelector('.row');
//     r.insertBefore( div , form);
//     setTimeout(() => {
//         document.querySelector('.alert').remove();
//     }, 3000);
// }

// uis.prototype.deleted = function(target){
//     if(target.className ==='delete'){
//         target.parentElement.parentElement.remove();
//     }
// }

// form.addEventListener('submit',
//  function(e){
//     const bName = document.getElementById('book-name').value;
//     const author = document.getElementById('book-author').value;
//     const ISBN = document.getElementById('ISBN').value;
    
//     const b = new book(bName , author , ISBN);

//     const ui = new uis();

//     if(bName === '' || author === '' || ISBN === ''){
//         //error to ui
//         ui.showAlert('please enter a valid input to the fields' , 'err')
//     }
//     else{
//         ui.showAlert('Book Added' , 'suc')
//         ui.addBook(b);
//         ui.clears();
//     }
//     e.preventDefault();
//  });

//  document.getElementById('books').addEventListener('click',function(e){
//     const ui = new uis();
//     ui.deleted(e.target);
//     ui.showAlert('Book Deleted','suc');
//     e.preventDefault();
//  })




                                //es6
 class book{
     constructor(bookName ,author , isbn){
        this.bookName = bookName;
        this.author = author;
        this.isbn = isbn;
     }
 }

 class uis{
    addBook(b){
        const tableBody = document.getElementById('books');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> ${b.bookName} </td>
            <td> ${b.author} </td>
            <td> ${b.isbn} </td>
            <td> <button class="delete">Delete</button> </td>
        `
        tableBody.appendChild(row);
    }
    clears(){
        document.getElementById('book-name').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('ISBN').value = '';
    }
    showAlert(message , classN){
        const div = document.createElement('div');
        div.className = `alert ${classN}`;
        div.appendChild(document.createTextNode(message));
        const r = document.querySelector('.row');
        r.insertBefore( div , form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    deleted(target){
        if(target.className ==='delete'){
            target.parentElement.parentElement.remove();
            const ui = new uis();
            ui.showAlert('Book Deleted','suc');
        }
    }
 }


 class Store{
    static  getBook(){
        let books;
        if (localStorage.getItem('books')===null){
            books = [];
        }
        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books' , JSON.stringify(books));
    }
    static displayBook(){
        const books = Store.getBook();
        const ui = new uis();
        books.forEach(book => {
            ui.addBook(book);
        });
    }
    static removeBook(isbn){
        const books = Store.getBook();
        books.forEach(function( book , index){
         //console.log('hi')
          books.splice(index,1);
          localStorage.setItem('books', JSON.stringify(books));
        });
    }
 }



 document.addEventListener('DOMContentLoaded' , Store.displayBook)

 form.addEventListener('submit',
 function(e){
    const bName = document.getElementById('book-name').value;
    const author = document.getElementById('book-author').value;
    const ISBN = document.getElementById('ISBN').value;
    
    const b = new book(bName , author , ISBN);

    const ui = new uis();

    if(bName === '' || author === '' || ISBN === ''){
        //error to ui
        ui.showAlert('please enter a valid input to the fields' , 'err')
    }
    else{
        ui.showAlert('Book Added' , 'suc')
        ui.addBook(b);
        ui.clears();
        Store.addBook(b);
    }
    e.preventDefault();
 });

 document.getElementById('books').addEventListener('click',function(e){
    const ui = new uis();
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    console.log(e.target.parentElement.previousElementSibling.textContent)
    ui.deleted(e.target);
    e.preventDefault();
 })
 //window.localStorage.removeItem('books');
let booksArr = localStorage['Books']
localStorage['Books'] != undefined ? booksArr = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')
const arr = booksArr.reverse()
const sad = arr.reverse()
function renderBooks(){
    let myBooks = document.querySelector('.myBooks__books')
    myBooks.innerHTML = ''

    if(localStorage['Books'] != undefined){
        sort()
        console.log(arr, booksArr, sad)
        for(let i = 0; i < arr.length ; i++){
            let id = arr[i].id.toString()
    
            let book = document.createElement('div');
            myBooks.appendChild(book);
            book.classList.add('book_card');
            book.setAttribute('id', id)
    
            let bookName = document.createElement('div');
            book.appendChild(bookName);
            bookName.classList.add('book_card-name');
            bookName.innerHTML = arr[i].login;
    
            let readBtn = document.createElement('input');
            book.appendChild(readBtn)
            readBtn.classList.add('book_card-button');
            readBtn.setAttribute('type', 'button');
            readBtn.setAttribute('value', 'Читать');
            readBtn.setAttribute('onClick', `readBook(${id})`);
    
            let delBtn = document.createElement('input');
            book.appendChild(delBtn)
            delBtn.classList.add('book_card-button');
            delBtn.setAttribute('type', 'button');
            delBtn.setAttribute('value', 'Удалить');
            delBtn.setAttribute('onClick', `delBook(${id})`);
    
            let changeStatusBtn = document.createElement('input');
            book.appendChild(changeStatusBtn)
            changeStatusBtn.classList.add('book_card-button');
            changeStatusBtn.setAttribute('type', 'button');
            changeStatusBtn.setAttribute('value', 'Status');
            changeStatusBtn.setAttribute('onClick', `changeStatusBook(${id})`);
    
            let editBtn = document.createElement('input');
            book.appendChild(editBtn)
            editBtn.classList.add('book_card-button');
            editBtn.setAttribute('type', 'button');
            editBtn.setAttribute('value', 'Редактировать');
            editBtn.setAttribute('onClick', `editBook(${id})`);
        }
    }
}

function sort(){
    // const arr = booksArr.reverse()
    
    return arr
}

function readBook(id){
    console.log('Читать ' + id)
    let item = arr.find(book => book.id === id)
    let readArea = document.createElement('div')
    let oldArea = document.getElementsByClassName('readBook__area')
    document.querySelector('.readBook').replaceChild(readArea, oldArea[0])
    readArea.classList.add('readBook__area')
    readArea.innerHTML = item.text
}

function delBook(id){
    let item = booksArr.find(book => book.id === id)
    let num =  booksArr.indexOf(item)
    booksArr.splice(num, 1)
    console.log(booksArr)
    localStorage.setItem('Books', JSON.stringify(booksArr))
    renderBooks
}

function changeStatusBook(id){
    console.log('Изменить статус ' + id)
    let item = booksArr.find(book => book.id === id)
    console.log(item)
}

function editBook(id){
    console.log('Изменить ' + id)
    let item = arr.find(book => book.id === id)
    console.log(item)
}

window.onload = renderBooks
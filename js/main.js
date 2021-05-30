function renderBooks(){
    sort()
    let myBooks = document.querySelector('.myBooks__books')
    myBooks.innerHTML = ''
    let booksArr = localStorage['Books']
    localStorage['Books'] != undefined ? booksArr = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')

    if(localStorage['Books'] != undefined){
        let arr = booksArr
        
        for(let i = 0; i < arr.length ; i++){
            let id = arr[i].id.toString()
    
            let book = document.createElement('div');
            myBooks.appendChild(book);
            if (arr[i].wasRead == false){
                book.classList.add('book_card');
            } else{
                book.classList.add('book_card-wasRead')
            }
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
    let prevArr = localStorage['Books']
    localStorage['Books'] != undefined ? prevArr = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')
    // console.log(prevArr)
    let readArr = []
    let unreadArr = []
    for(let i = 0; i < prevArr.length; i++){
        if(prevArr[i].wasRead == true){
            readArr.push(prevArr[i])
        } else{
            unreadArr.push(prevArr[i])
        }
    }
    readArr.sort(function (a, b) {
        return b.id - a.id;
    });
    unreadArr.sort(function (a, b) {
        return b.id - a.id;
    });
    let newArr = readArr.concat(unreadArr)
    localStorage.setItem('Books', JSON.stringify(newArr))
}

function readBook(id){
    let booksArr = localStorage['Books']
    localStorage['Books'] != undefined ? booksArr = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')
    console.log('Читать ' + id)
    let item = booksArr.find(book => book.id === id)
    let readArea = document.createElement('div')
    let oldArea = document.getElementsByClassName('readBook__area')
    document.querySelector('.readBook').replaceChild(readArea, oldArea[0])
    readArea.classList.add('readBook__area')
    readArea.innerHTML = item.text
}

function delBook(id){
    let booksArr = localStorage['Books']
    localStorage['Books'] != undefined ? booksArr = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')
    let item = booksArr.find(book => book.id === id)
    let num =  booksArr.indexOf(item)
    booksArr.splice(num, 1)
    console.log(booksArr)
    localStorage.setItem('Books', JSON.stringify(booksArr))
    renderBooks()
    // booksArr = localStorage['Books']
}

function changeStatusBook(id){
    let booksArr = localStorage['Books']
    localStorage['Books'] != undefined ? booksArr = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')
    console.log('Изменить статус ' + id)
    let item = booksArr.find(book => book.id === id)
    let num =  booksArr.indexOf(item)
    booksArr[num].wasRead = !booksArr[num].wasRead
    localStorage.setItem('Books', JSON.stringify(booksArr))
    renderBooks()
}

function editBook(id){
    document.querySelector('.readBook__area').innerHTML=''
    let booksArr = localStorage['Books']
    localStorage['Books'] != undefined ? booksArr = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')
    console.log('Изменить ' + id)
    let item = booksArr.find(book => book.id === id)
    let changeForm = document.createElement('form')
    changeForm.style.display = 'flex'
    changeForm.style.flexDirection = 'column'

    let changeName = document.createElement('input')
    changeName.setAttribute('value', `${booksArr[booksArr.indexOf(item)].login}`)

    let changeText = document.createElement('textarea')
    changeText.style.wordWrap = 'break-word'
    changeText.style.height = '250px'
    changeText.innerHTML = `${booksArr[booksArr.indexOf(item)].text}`

    let changeButton = document.createElement('input')
    changeButton.setAttribute('type', 'button')
    changeButton.setAttribute('value', 'Сохранить')
    changeButton.addEventListener('click', function(){
        booksArr[booksArr.indexOf(item)].login = changeName.value
        booksArr[booksArr.indexOf(item)].text = changeText.value
        document.querySelector('.readBook__area').innerHTML=''
        localStorage.setItem('Books', JSON.stringify(booksArr))
        renderBooks()
    })
    
    document.querySelector('.readBook__area').appendChild(changeForm)
    changeForm.appendChild(changeName)
    changeForm.appendChild(changeText)
    changeForm.appendChild(changeButton)
}

window.onload = renderBooks
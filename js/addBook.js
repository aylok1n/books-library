const upload = document.getElementById('upload');
const write = document.getElementById('wtite');
const uploadForm = document.forms.uploadForm;
const writeForm = document.forms.writeForm;

upload.addEventListener("change", function(){
    if(this.checked){
        uploadForm.style.display = 'flex';
        writeForm.style.display = 'none';
    }
});
write.addEventListener("change", function(){
    if(this.checked){
        writeForm.style.display = 'flex';
        uploadForm.style.display = 'none';
    }
});
uploadForm.elements[2].addEventListener('click', sendBook);
writeForm.elements[2].addEventListener('click', writeBook);

function sendBook(){
    let Books = [];
    localStorage['Books'] != undefined ? Books = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')
    let formData = new FormData(uploadForm);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://apiinterns.osora.ru/');
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if(formData.get('login') == '' || JSON.parse(this.response).text == undefined){
            alert('Введите валидные значения')
        }
        else{
            Books.push({
                login:formData.get('login'),
                text:JSON.parse(this.response).text,
                id: Date.now(),
                wasRead: false
            });
            localStorage.setItem('Books', JSON.stringify(Books));
            uploadForm.submit()
        }
      }
    xhr.send(formData);
}
function writeBook(){
    let Books = [];
    localStorage['Books'] != undefined ? Books = JSON.parse(localStorage['Books']) : console.log('localStorage пуст')
    let formData = new FormData(writeForm);
    if(formData.get('login') == '' || formData.get('text') == ''){
        alert('Введите валидные значения')
    }
    else{
        Books.push({
            login: formData.get('login'), 
            text:formData.get('text'),
            id: Date.now(),
            wasRead: false
        })
        localStorage.setItem('Books', JSON.stringify(Books))
        uploadForm.submit()
    }
}



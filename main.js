let myLibrary = [new Book ('Suzanne Collins', 'The Hunger Games', 428, 'read'), new Book (' J.K. Rowling', 'Harry Potter and the Order of the Phoenix ', 800, 'reading'), new Book ('Jane Austen', 'Pride and Prejudice', 900, 'unread')];

let bookLog = {
  totalBooks: 0,
  read: 0,
  reading: 0,
  unread: 0
}

updateBookLog();
function updateBookLog(){
  let read =0;
  let reading =0;
  let unread=0;
  myLibrary.forEach((book) => {
    if(book.readStatus === 'read'){
      read++;
    }
    if(book.readStatus === 'reading'){
      reading++;
    }
    if(book.readStatus === 'unread'){
      unread++;
    }
  })

  bookLog.totalBooks= myLibrary.length;
  bookLog.read =read;
  bookLog.reading =reading;
  bookLog.unread = unread;
  renderBookLog();
}


function renderBookLog(){
  document.querySelector('.bookLog').innerHTML=`
      <h2>Total Books: ${bookLog.totalBooks}</h2>
      <h2>Read: ${bookLog.read}</h2>
      <h2>Reading: ${bookLog.reading}</h2>
      <h2>Unread: ${bookLog.unread}</h2>
  `
}



//constructor 
function Book (author, title, numOfPages, readStatus){
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
}


//gets info of new book from html form 
//will return an object if all inputs are valid, otherwise returns false
function getNewBookInfo (){
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const numOfPages = document.getElementById('numOfPages').value;
  const valid = formValidCheck (author, title, numOfPages);
  const readStatus = document.getElementById('read-status').value;

  if(valid){
    return new Book (author, title, numOfPages, readStatus);
  }
  else{
    return false;
  }
}

//adds a book object to myLibrary array 
function addToLibrary(newBook){
  myLibrary.push(newBook);
  renderBooks();
  updateBookLog();
}

//resets form 
function resetForm () {
  document.querySelector('.form').reset();
  document.querySelectorAll('.error-msg').forEach((e) => {
    e.textContent='';
  })
}

//add an event listner to form 
document.querySelector('.form').addEventListener('submit', (e) =>{
  e.preventDefault();

  const newBook = getNewBookInfo();
  if(newBook !== false){
    addToLibrary(newBook);
    resetForm(); 
    closeOverlay();
  }
})

//checks if form is valid or not 
function formValidCheck (author, title, numOfPages) {
  let flag = true;
  if(author === '' ){
    document.querySelector('.author-error').textContent = '*This Field is Required';
    flag= false;
  }
  
  if(title === ''){
    document.querySelector('.title-error').textContent = '*This Field is Required';
    flag=false;
  }
  if( numOfPages === ''){
    document.querySelector('.numOfPages-error').textContent = '*This Field is Required';
    flag=false;
  }
  
  return flag;
}




document.querySelector('.log').addEventListener('click', () => {
  console.log(myLibrary);
})


//This section is for opening and closing the overlat alert
document.getElementById('add-book').addEventListener('click', () => {
  openOverlay();

})

document.getElementById('overlay').addEventListener('click', () => {
  closeOverlay();
})


function openOverlay () {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('form-container').style.display = 'flex';

}

function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('form-container').style.display = 'none';
}


renderBooks();
function renderBooks (){
  let html = '';
  
  myLibrary.forEach((book,index) => {
    const statusHTML = getSelectedHtml(book);
    html += `
    <div class="book-card">
      <h3>${book.title}</h3>
      <h4>${book.author}</h4>
      <h5>${book.numOfPages} pages</h5>
      <div>
        <h5>Status</h5>
        <select name="read-status" id="read-status">
          ${statusHTML}
        </select>
      </div>
      
      
      <button class="remove" id=${index}>remove</button>
    </div>
    `

  });

  document.getElementById('book-container').innerHTML = html;

  document.querySelectorAll('.remove').forEach((removeBtn) => {
    removeBtn.addEventListener('click', () => {
      removeBook(removeBtn.getAttribute('id'));
    })
  })
  
}




function getSelectedHtml(book){
  const status = book.readStatus;
  let html =``;
  if(status === 'unread'){
    html = `
      <option value="unread" selected="selected">unread</option>
      <option value="reading">reading</option>
      <option value="read">read</option>
    `
  }

  if (status === 'reading'){
    html = `
      <option value="unread" >unread</option>
      <option value="reading" selected="selected">reading</option>
      <option value="read">read</option>
    `
  }

  if (status === 'read'){
    html = `
      <option value="unread" >unread</option>
      <option value="reading">reading</option>
      <option value="read" selected="selected">read</option>
    `
  }

  return html;

}


function removeBook(index){
  myLibrary.splice(index,1);
  renderBooks();
  updateBookLog();
}
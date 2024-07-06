let myLibrary = [];

//constructor 
function Book (author, title, numOfPages, readingStatus){
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.readingStatus = readingStatus;
}


//gets info of new book from html form 
//will return an object if all inputs are valid, otherwise returns false
function getNewBookInfo (){
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const numOfPages = document.getElementById('numOfPages').value;
  const valid = formValidCheck (author, title, numOfPages);
  const readStatus = document.getElementById('readStatus').checked;

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
}

//resets form 
function resetForm () {
  document.querySelector('.form').reset();
}

//add an event listner to form 
document.querySelector('.form').addEventListener('submit', (e) =>{
  e.preventDefault();

  const newBook = getNewBookInfo();
  if(newBook !== false){
    addToLibrary(newBook);
    resetForm(); 
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
let myLibrary = [];

function Book (author, title, numOfPages, readingStatus){
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.readingStatus = readingStatus;
}









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


function addToLibrary(newBook){
  myLibrary.push(newBook);
}


document.querySelector('.form').addEventListener('submit', (e) =>{
  e.preventDefault();

  const newBook = getNewBookInfo();
  if(newBook !== false){
    addToLibrary(newBook);
    resetForm(); 
    //document.querySelector('.form').submit();
    
  }

})

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

function resetForm () {
  document.querySelector('.form').reset();
}


document.querySelector('.log').addEventListener('click', () => {
  console.log(myLibrary);
})
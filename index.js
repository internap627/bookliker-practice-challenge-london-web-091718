document.addEventListener("DOMContentLoaded", function() {});
const list = document.querySelector('#list')
const show = document.querySelector('#show-panel')


// List one book
function listOne(book){
  let liEl = document.createElement('li')
  liEl.id = book.id
  liEl.innerHTML = `
  <h4>${book.title}</h4>
  `
  list.appendChild(liEl)
  liEl.addEventListener('click', () => {
    showBook(book)

  })
}

//List all books
function listAllBooks(books) {
  books.forEach(book => listOne(book))
}

//Show book
function showBook(book){
  show.innerHTML = ""
  let div = document.createElement('div')
  let users = bookUsers(book)
  div.innerHTML = `
  <h3>${book.title}</h3>
  <img src="${book.img_url}"/>
  <p>${book.description}</p>
  <h4>The following users liked this book : </h4>
  <p>${users}</p>
  <button type="button">Read Book</button>
  `
  show.appendChild(div)
  div.querySelector('button').addEventListener('click', () => {
    checkLike(book)
  })
}

function bookUsers(book){
  let name = []
  book.users.forEach(user => {
    name.push(user.username.charAt(0).toUpperCase() + user.username.slice(1))
  })
  return name.join(", ")
}

function checkLike(book) {
  let names = []
  book.users.forEach(user => {
    names.push(user.username)
  })
  if(names.includes("pouros")){
    alert("You already read this!")
  }
  else {
    addLike(book)
  }
}

function addLike(book){
  book.users.push({
    "id": 1,
    "username": "pouros"
  })
  let usersArr = book.users
  fetch(`http://localhost:3000/books/${book.id}`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'PATCH',
  body: JSON.stringify( book )
})
showBook(book)
}


fetchBooks()

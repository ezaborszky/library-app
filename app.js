class Book {
    constructor(author,title,pages,isRead) {
        this.author = author
        this.title = title
        this.pages = pages
        this.isRead = isRead
    }
}

const openModalButton = document.querySelector('[data-open-modal-button]')
const closeModalButton = document.querySelector('[data-close-modal-button]')
const modalWindow = document.querySelector('[data-modal]')
const testButton = document.querySelector('[data-teszt]')
const displayArea = document.querySelector('[data-display-area]')
const submitButton = document.querySelector('[data-modal-form-input-submit]')
const libraryData = [];
const author = document.querySelector('[data-modal-form-input-author]')
const title = document.querySelector('[data-modal-form-input-title]')
const pages = document.querySelector('[data-modal-form-input-pages]')
const isRead = document.querySelector('[data-modal-form-input-is-read]')

 


const  openModal = () => {
    modalWindow.classList.add("active");
}


const  closeModal = () => {
    modalWindow.classList.remove("active");
}

const resetModal = () => {
    author.value = "Author's name";
    title.value = "Title";
    pages.value = 0;
    isRead.checked = false;
}

openModalButton.addEventListener('click', () => {
    openModal();
})

closeModalButton.addEventListener('click', () => {
    closeModal();
})

const newBook = () => {
    const book = new Book(author.value,title.value,pages.value,isRead.checked)
    libraryData.push(book)
}

const refreshScreen = () => {
    displayArea.innerHTML="";
    libraryData.forEach(book => {
        const index = libraryData.indexOf(book);
        displayArea.appendChild(document.createElement("div"))
        displayArea.lastChild.setAttribute("id", `${index}`)
        displayArea.lastChild.innerHTML = `<div>Title: ${book.title}</div> <div>Author: ${book.author}</div> <div>Pages: ${book.pages}</div> <div>Have you read it: ${book.isRead}</div>`
        displayArea.lastChild.innerHTML += `<div class='card-buttons'><button class='card-button' data-delete='${index}'>Delete</button><button class='card-status-button' data-status='${index}'>Change read status</button></div>`
        displayArea.lastChild.classList.add("card");
    
    })
}

// updateButtons = document.querySelectorAll('card-status-button')


displayArea.addEventListener('click', function (e) {
    // But only alert for elements that have an alert-button class
    if (e.target.classList.contains('card-button')) {
        const index = e.target.dataset.delete;
        libraryData.splice(index,1);
        refreshScreen();
    } else if (e.target.classList.contains('card-status-button')) {
        const index = e.target.dataset.status;
        libraryData[index].isRead = !libraryData[index].isRead
        refreshScreen();
    }
  });


// deleteButtons.forEach(button => {
//     button.addEventListener('click', () => {
//     console.log(button)
//     const index = button.dataset.delete;
//     
//     })
   
// })


submitButton.addEventListener('click', (event) => {
    newBook();
    refreshScreen();
    event.preventDefault();
    closeModal();
    resetModal();
})
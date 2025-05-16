let main = document.querySelector(".main");
let StReadWantToRead = document.querySelector(".main-card__status");
const dialog = document.querySelector("dialog");
const formButtonAdd = document.querySelector(".form-button-add");
const formButtonRemove = document.querySelector(".form-button-remove");

document.querySelector(".header-right").onclick = function () {
    dialog.showModal();
}

document.querySelector(".form-button-add").onclick = function () {
    dialog.close();
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}

Book.prototype.addBookToLibrary = function (library) {
    library.push(this);
}

const myLibrary = [];

// Add button

formButtonAdd.addEventListener("click", (event) => {
    event.preventDefault();
    createBook();
    clearInputs();
    dialog.close();
});

formButtonRemove.addEventListener("click", (event) => {
    event.preventDefault();
    clearInputs();
    dialog.close();
})

main.addEventListener("click", (event) => {
    if (event.target.classList.contains("card-button-remove")) {
        event.target.parentElement.remove();
        let cardId = event.target.parentElement.dataset.id;
        removeBookFromLibrary(cardId);
    }

    if (event.target.classList.contains("main-card__status")) {
        if (event.target.value === "want to read") {
            event.target.parentElement.parentElement.classList.add("main-card-no-read");
            event.target.parentElement.parentElement.classList.remove("main-card-read");

        } else {
            event.target.parentElement.parentElement.classList.add("main-card-read");
            event.target.parentElement.parentElement.classList.remove("main-card-no-read");
        
        }
    }

})


// function create book

function createBook() {
    const inputTittle = document.querySelector("#form-tittle");
    const inputAuthor = document.querySelector("#form-author");
    const inputNumber = document.querySelector("#form-number");
    const inputStatus = document.querySelector("#form-status");
    let bookStatus = "";

    if (inputStatus.checked) {
        bookStatus = "read";
    } else {
        bookStatus = "want to read";
    }

    let book = new Book(
        inputTittle.value,
        inputAuthor.value,
        inputNumber.value,
        bookStatus
    );

    book.addBookToLibrary(myLibrary);
    createBookCard(book);

}

// function create book card

function createBookCard(book) {
    let mainCard = document.createElement("div");
    mainCard.classList.add("main-card");
    mainCard.dataset.id = book["id"];
    main.appendChild(mainCard);

    let mainCardName = document.createElement("div");
    mainCardName.classList.add("main-card__name");
    mainCardName.textContent = book["title"];

    let mainCardAuthor = document.createElement("div");
    mainCardAuthor.classList.add("main-card__author");
    mainCardAuthor.textContent = `Autohor: ${book["author"]}`;

    let mainCardPages = document.createElement("div");
    mainCardPages.classList.add("main-card__pages");
    mainCardPages.textContent = `Pages: ${book["pages"]}`;

    // status

    let mainCardStatus = document.createElement("div");
    mainCardStatus.classList.add("main-card__status");

    let label = document.createElement("label");
    label.htmlFor = "main-card__status";
    label.textContent = "Status: ";

    let select = document.createElement("select");
    select.id = "main-card__status";
    select.classList.add("main-card__status"); 

    let optionRead = document.createElement("option");
    optionRead.value = "read";
    optionRead.textContent = "Read";

    let optionWantToRead = document.createElement("option");
    optionWantToRead.value = "want to read";
    optionWantToRead.textContent = "Want to read";

    select.append(optionRead, optionWantToRead);
    if (book["status"] === "read") {
        select.value = "read";
        mainCard.classList.add("main-card-read");
    } else {
        select.value = "want to read";
        mainCard.classList.add("main-card-no-read");
    }

    mainCardStatus.append(label, select);

    let cardButtonRemove = document.createElement("button");
    cardButtonRemove.classList.add("card-button-remove");
    cardButtonRemove.type = "button";
    cardButtonRemove.textContent = "×";


    mainCard.append(
        mainCardName,
        mainCardAuthor,
        mainCardPages,
        mainCardStatus,
        cardButtonRemove
    );

}

function clearInputs() {
    const inputTittle = document.querySelector("#form-tittle");
    const inputAuthor = document.querySelector("#form-author");
    const inputNumber = document.querySelector("#form-number");
    const inputStatus = document.querySelector("#form-status");

    inputTittle.value = "";
    inputAuthor.value = "";
    inputNumber.value = "";
    inputStatus.checked = false;
}

function removeBookFromLibrary(id) {
    myLibrary = myLibrary.filter((obj) => obj.id != id);
}

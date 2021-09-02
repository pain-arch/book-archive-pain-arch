//fetching books data from API
const loadBooks = () => {

    const bookTitle = document.getElementById('book-title');
    const searchText = bookTitle.value;

     console.log(searchText);

    const url =`https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showBooks(data.docs.slice(0,20),data.docs.length))


    bookTitle.value = '';
};

// function for showing books results
const showBooks = (books, length) =>{
    const resultDiv = document.getElementById('search-resutls');
    resultDiv.innerHTML=''; 

    const resultTitle = document.getElementById('results');

    const showingLength = document.getElementById('showing-length');
    showingLength.innerText = books.length;

    const totalLength = document.getElementById('result-length');
    totalLength.innerText = length;

    const resultMessage = document.getElementById('result-message');
    resultMessage.classList.remove('d-none');
    const errorMessage = document.getElementById('error-message');
    
    // function for error messages
    if (books.length === 0) {
        errorMessage.classList.remove('d-none');
        resultMessage.classList.add('d-none');
        resultTitle.classList.add('d-none');
    } 
    else{
        errorMessage.classList.add('d-none');
        resultTitle.classList.remove('d-none');
    }

    // using foreach loop to show book Cards
    books.forEach(book => {
         const booksCard = document.createElement('div');

         //setting the book card image url 
         let imgUrl ;
         if(book.cover_i){
            imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
         }
         else{
             imgUrl = `https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg`;
         }

         // setting the book Card error message
         let publishYear;
         if(book.first_publish_year){
             publishYear = book.first_publish_year;
         }
         else{
             publishYear = "Unknown";
         }

        // creating and appending child
        booksCard.innerHTML =`
            <div class="col">
                  <div class="card">
                    <img src="${imgUrl}" class="card-img-top w-75 mx-auto mt-2" alt="book-img">
                    <div class="card-body">
                      <h5 class="card-title fs-4">${book.title}</h5>
                      <p class="card-text author-name">Written by <span class="text-uppercase text-primary">${book.author_name}</span></p>
                      <p class="card-text publisher-name">Published by <span class="text-danger">${book.publisher}</span></p>
                      <p class="card-text publishing-date">First Published on <span class="fw-bold">${publishYear}</span></p>
                    </div>
                  </div>
            </div>
         `
        resultDiv.appendChild(booksCard);        
    });
};
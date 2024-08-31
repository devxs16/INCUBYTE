class Library {
    constructor() {
      this.books = [];
    }
  
    addBook(isbn, title, author, publicationYear) {
      
      if (this.books.some(book => book.isbn === isbn)) {
        throw new Error('Book with this ISBN already exists.');
      }
      this.books.push({
        isbn,
        title,
        author,
        publicationYear,
        available: true
      });
    }
  
    borrowBook(isbn) {
      const bookIndex = this.findBookIndex(isbn);
      if (bookIndex === -1) {
        throw new Error('Book not found in the library.');
      }
      if (!this.books[bookIndex].available) {
        throw new Error('Book is not available for borrowing.');
      }
      this.books[bookIndex].available = false;
    }
  
    returnBook(isbn) {
      const bookIndex = this.findBookIndex(isbn);
      if (bookIndex === -1) {
        throw new Error('Book not found in the library.');
      }
      if (this.books[bookIndex].available) {
        throw new Error('Book is already available.');
      }
      this.books[bookIndex].available = true;
    }
  
    viewAvailableBooks() {
      return this.books.filter(book => book.available);
    }
  
    findBookIndex(isbn) {
      return this.books.findIndex(book => book.isbn === isbn);
    }
  }
  module.exports = Library;
 
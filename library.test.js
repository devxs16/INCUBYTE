

 const Library = require('./library');

describe('Library Management System', () => {
  let library;

  beforeEach(() => {
    library = new Library();
  });

  test('Adding a new book', () => {
    library.addBook('9781982102319', 'Sapiens', 'Yuval Noah Harari', 2011);
    expect(library.books.length).toBe(1);
  });

  test('Adding a book with existing ISBN throws an error', () => {
    library.addBook('9781982102319', 'Sapiens', 'Yuval Noah Harari', 2011);
    expect(() => {
      library.addBook('9781982102319', 'Another Book', 'Author', 2020);
    }).toThrow('Book with this ISBN already exists.');
  });

  test('Borrowing a book marks it as unavailable', () => {
    library.addBook('9781982102319', 'Sapiens', 'Yuval Noah Harari', 2011);
    library.borrowBook('9781982102319');
    expect(library.books[0].available).toBe(false);
  });

  test('Returning a borrowed book marks it as available', () => {
    library.addBook('9781982102319', 'Sapiens', 'Yuval Noah Harari', 2011);
    library.borrowBook('9781982102319');
    library.returnBook('9781982102319');
    expect(library.books[0].available).toBe(true);
  });

  test('Viewing available books', () => {
    library.addBook('9781982102319', 'Sapiens', 'Yuval Noah Harari', 2011);
    library.addBook('9780062316097', 'The Subtle Art of Not Giving a F*ck', 'Mark Manson', 2016);
    library.borrowBook('9781982102319');
    const availableBooks = library.viewAvailableBooks();
    expect(availableBooks.length).toBe(1);
    expect(availableBooks[0].title).toBe('The Subtle Art of Not Giving a F*ck');
  });

  test('Borrowing a non-existent book throws an error', () => {
    expect(() => {
      library.borrowBook('Non-existent ISBN');
    }).toThrow('Book not found in the library.');
  });

  test('Returning an already available book throws an error', () => {
    library.addBook('9781982102319', 'Sapiens', 'Yuval Noah Harari', 2011);
    expect(() => {
      library.returnBook('9781982102319');
    }).toThrow('Book is already available.');
  });
});

import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

import './App.css'
import BookSearch from './BookSearch';
import BookShelf from './BookShelf';
import { SHELF_QUERY_MAP, SHELF_TITLE_MAP } from './constants';

class BooksApp extends React.Component {
  state = {
    books: [],
    currentBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then((booksResp) => {
      this.setState((currentState) => {
        const currentBooks = [];
        const wantToReadBooks = [];
        const readBooks = [];

        currentState.books.forEach(b => {
          if (booksResp[SHELF_QUERY_MAP.CURRENT].includes(b.id)) {
            b.shelf = SHELF_QUERY_MAP.CURRENT;
            currentBooks.push(b);
          } else if (booksResp[SHELF_QUERY_MAP.WANT].includes(b.id)) {
            b.shelf = SHELF_QUERY_MAP.WANT;
            wantToReadBooks.push(b);

          } else if (booksResp[SHELF_QUERY_MAP.READ].includes(b.id)) {
            b.shelf = SHELF_QUERY_MAP.READ;
            readBooks.push(b);
          }
        });

        if (!currentState.books.find((currBook)=>currBook.id === book.id)){
          book.shelf = shelf;
        
          if(shelf === SHELF_QUERY_MAP.CURRENT){
            currentBooks.push(book);
          } else if(shelf === SHELF_QUERY_MAP.WANT){
            wantToReadBooks.push(book);
          } else if(shelf === SHELF_QUERY_MAP.READ){
            readBooks.push(book);
          }
          
        }

        return {
          books: [].concat(currentBooks, wantToReadBooks,readBooks),
          currentBooks,
          wantToReadBooks,
          readBooks
        };
      });
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState(() => ({
        books,
        currentBooks: books.filter(book => book.shelf === SHELF_QUERY_MAP.CURRENT),
        wantToReadBooks: books.filter(book => book.shelf === SHELF_QUERY_MAP.WANT),
        readBooks: books.filter(book => book.shelf === SHELF_QUERY_MAP.READ)
      }));
    });
  }

  render() {
    const { books, currentBooks, wantToReadBooks, readBooks } = this.state;
    return (
      <div className='app'>

        <Route exact path='/search' render={() => (
          <BookSearch myBooks={books} onBookUpdate={(book, shelf) => {
            this.updateBook(book, shelf);
          }} />
        )} />

        <Route exact path='/' render={() => (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <BookShelf shelfBooks={currentBooks} shelfTitle={SHELF_TITLE_MAP.CURRENT} onBookUpdate={(book, shelf) => {
              this.updateBook(book, shelf)
            }} />
            <BookShelf shelfBooks={wantToReadBooks} shelfTitle={SHELF_TITLE_MAP.WANT}
              onBookUpdate={(book, shelf) => {
                this.updateBook(book, shelf)
              }} />
            <BookShelf shelfBooks={readBooks} shelfTitle={SHELF_TITLE_MAP.READ}
              onBookUpdate={(book, shelf) => {
                this.updateBook(book, shelf)
              }} />
          </div>
        )} />

        <Link to='/search' className='open-search'>
          <button>Add a book</button>
        </Link>
      </div>
    )
  }
}

export default BooksApp

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
import { SHELF_QUERY_MAP } from './constants';


class BookSearch extends Component {
  static propTypes = {
    onBookUpdate: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired
  }
  state = {
    query: '',
    results: []
  };

  updateBook(book, shelf){
    this.props.onBookUpdate(book, shelf);
  }

  updateQuery(query) {
    this.setState(() => ({
      query
    }));
    if (query) {
      BooksAPI.search(query).then((results) => {
        this.setState((currState) => {
          if (!results.error) {
            results.forEach((result) => {
              const matchedBook = this.props.myBooks.find((myBook) => myBook.id === result.id);
              if (matchedBook) {
                result.shelf = matchedBook.shelf;
              } else {
                result.shelf = SHELF_QUERY_MAP.NONE;
              }
            });
          } else {
            results = [];
          }

          return {
            results
          }
        })
      });
    }
  }

  render() {
    return (
      <div>
        <div className='search-books'>
          <div className='search-books-bar'>
            <Link to='/'>
              <button className='close-search'>Close</button>
            </Link>
            <div className='search-books-input-wrapper'>
              <input
                type='text'
                placeholder='Search by title or author'
                value={this.state.query}
                onChange={event => this.updateQuery(event.target.value)} />
            </div>
          </div>
          <div className='search-books-results'>
            {this.state.results.length === 0 ?
              (this.state.query ? <h3>No Results Found.</h3> : <div>Search for books in the search box.</div>) :
              <BookShelf shelfBooks={this.state.results} shelfTitle={'Search Results'} 
              onBookUpdate={(book, shelf) => {
                this.updateBook(book, shelf);
              }} />}
          </div>
        </div>
      </div>
    );
  }
}

export default BookSearch;

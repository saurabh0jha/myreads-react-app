import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelf extends Component {
    static propTypes = {
        shelfBooks: PropTypes.array.isRequired,
        shelfTitle: PropTypes.string.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    }

    render() {

        const { shelfBooks, shelfTitle, onBookUpdate } = this.props;

        return (
            <div className='list-books-content'>
                <div>
                    <div className='bookshelf'>
                        <h2 className='bookshelf-title'>{shelfTitle}  ({shelfBooks.length})</h2>
                        <div className='bookshelf-books'>
                            <ol className='books-grid'>
                                {shelfBooks.length === 0 ? 
                                <li>
                                    <h4> No Books In the current category. </h4>
                                </li> :
                                 shelfBooks.map((book) => (
                                    <li key={book.id}>
                                        <div className='book'>
                                            <div className='book-top'>
                                                {book.imageLinks ? <div className='book-cover' style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                }}></div>: <div className='book-cover' style={{
                                                    width: 128,
                                                    height: 193}}> No Thumbnail </div>}
                                                <div className='book-shelf-changer'>
                                                    <select value={book.shelf} onChange={(event)=>{
                                                        onBookUpdate(book, event.target.value);
                                                    }}>
                                                        <option value='move' disabled>Move to...</option>
                                                        <option value='currentlyReading'>Currently Reading</option>
                                                        <option value='wantToRead'>Want to Read</option>
                                                        <option value='read'>Read</option>
                                                        <option value='none'>None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='book-title'>{book.title || 'No Title Found'}</div>
                                            <div className='book-authors'>{(book.authors && book.authors.join()) || 'No Author Found'}</div>
                                            <a href={book.previewLink} rel="noopener noreferrer" target='_blank'><small>More Details</small></a>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;















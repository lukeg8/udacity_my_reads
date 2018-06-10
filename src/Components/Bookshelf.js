import React from "react";
import Bookgrid from "./Bookgrid";

function Bookshelf(props) {
    const { whichBookShelf, bookshelf, handleBookShelfChangeRef } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">
                {whichBookShelf} - {bookshelf.length} Books
            </h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {bookshelf.length !== 0
                        ? bookshelf.map(book => (
                              <Bookgrid
                                  key={book.id}
                                  book={book}
                                  handleBookShelfChangeRef={
                                      handleBookShelfChangeRef
                                  }
                              />
                          ))
                        : "Empty BookShelf"}
                </ol>
            </div>
        </div>
    );
}

export default Bookshelf;

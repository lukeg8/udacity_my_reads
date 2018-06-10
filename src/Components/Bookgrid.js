import React, { Component } from "react";
import Bookoption from "./Bookoption";

class Bookgrid extends Component {
    handleChangeBookGrid = event => {
        const newBookShelf = event.target.value;
        const bookID = this.props.book.id;
        this.props.handleBookShelfChangeRef(bookID, newBookShelf);
    };
    render() {
        let {
            title,
            authors,
            shelf,
            imageLinks,
            canonicalVolumeLink
        } = this.props.book;
        // Setting imageLink to '' if one doesn't exist
        imageLinks =
            imageLinks === undefined ? { smallThumbnail: "" } : imageLinks;

        const authorsList = Array.isArray(authors)
            ? authors.join(", ")
            : authors;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 200,
                                backgroundImage:
                                    'url("' + imageLinks.smallThumbnail + '")'
                            }}
                        />
                        <Bookoption
                            shelf={shelf}
                            handleChangeBookOption={this.handleChangeBookGrid}
                        />
                    </div>
                    <div className="book-title">
                        <a href={canonicalVolumeLink}>{title}</a>
                    </div>
                    <div className="book-authors">{authorsList}</div>
                </div>
            </li>
        );
    }
}

export default Bookgrid;

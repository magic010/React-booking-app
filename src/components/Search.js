import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { search } from "../BooksAPI";
import Books from "./Books";

const Search = (props) => {
  const [query, setQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const { booksData, onUpdateShelfType } = props;

  const updateQuery = async (query) => {
    if (query) {
      setQuery(query);
      const res = await search(query.trim(), 10);
      if (res.length > 0) {
        res.map((item) => {
          const data = booksData.find((book) => book.id === item.id);
          data && data.shelf
            ? (item.shelf = data.shelf)
            : (item.shelf = "none");
        });
        setSearchedBooks(res);
        setNoResult(false);
      } else {
        setSearchedBooks([]);
        setNoResult(true);
      }
    } else {
      setQuery("");
    }
  };
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchedBooks.length > 0 && (
          <span>
            Now showing {searchedBooks.length}{" "}
            {searchedBooks.length > 1 ? "books" : "book"}
          </span>
        )}
        <Books
          booksData={searchedBooks}
          onUpdateShelfType={onUpdateShelfType}
        />
        {noResult && <img src="img/noResultFound.png" alt="noResultFoundIMG" />}
      </div>
    </div>
  );
};

Search.propTypes = {
  booksData: PropTypes.array.isRequired,
  onUpdateShelfType: PropTypes.func.isRequired,
};

export default Search;

import PropTypes from "prop-types";
import "../App.css";

const DropDownItem = (props) => {
  const { book, onUpdateShelfType } = props;

  const onChangeShelf = (book, shelf) => {
    onUpdateShelfType(book, shelf);
  };

  return (
    <div className="book-shelf-changer">
      <select
        defaultValue={book?.shelf || "none"}
        onChange={(event) => onChangeShelf(book, event.target.value)}
      >
        <option value="moveTo" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

DropDownItem.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelfType: PropTypes.func.isRequired,
};

export default DropDownItem;

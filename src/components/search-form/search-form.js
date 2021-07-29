import React from "react";

import "./search-form.css";
import PropTypes from "prop-types";

const debounce = (fn, debounceTime) => {
  let timeOut;
  // eslint-disable-next-line func-names
  return function () {
    const fnCall = () => {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
    };
    clearTimeout(timeOut);
    timeOut = setTimeout(fnCall, debounceTime);
  };
};

const SearchForm = ({ onItemAdded }) => {
  const onLabelChange = debounce((e) => {
    e.preventDefault();
    if (e.target.value !== undefined && e.target.value.trim() !== "") {
      onItemAdded(e.target.value);
    }
  }, 500);

  return (
    <input
      type="text"
      className="header__input"
      placeholder="Type to search..."
      autoFocus
      onChange={onLabelChange}
    />
  );
};

SearchForm.propTypes = {
  onItemAdded: PropTypes.func,
};

export default SearchForm;

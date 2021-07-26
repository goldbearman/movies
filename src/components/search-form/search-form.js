import React, { Component } from "react";

import "./search-form.css";
import PropTypes from "prop-types";

export default class SearchForm extends Component {
  static propTypes = {
    onItemAdded: PropTypes.func,
  };

  state = {
    label: "",
  };

  debounce = (fn, debounceTime) => {
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

  onLabelChange = this.debounce((e) => {
    e.preventDefault();
    if (e.target.value !== undefined && e.target.value.trim() !== "") {
      this.props.onItemAdded(e.target.value);
    }
  }, 500);

  render() {
    return (
      <form action="" onSubmit={() => this.debounce(this.onSubmit, 5000)}>
        <input
          type="text"
          className="header__input"
          placeholder="Type to search..."
          autoFocus
          onChange={this.onLabelChange}
          // value={this.state.label}
        />
      </form>
    );
  }
}

import React, { Component } from "react";

import "./search-form.css";

export default class SearchForm extends Component {
  state = {
    label: "",
  };

  debounce = (fn, debounceTime) => {
    let timeOut;
    return function () {
      const fnCall = () => {
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
    console.log(e.target.value);
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

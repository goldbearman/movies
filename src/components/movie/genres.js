import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Genres extends PureComponent {
  // const Genres = ({ allGenres, movieGenres }) => {

  // constructor(props) {
  //   super(props);
  //   // this.myRef = React.createRef();
  // }

  state = {
    height: 0,
  };

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(this.myRef.offsetHeight);
    // eslint-disable-next-line no-console
    console.log(this.myRef.offsetHeight);
    // eslint-disable-next-line no-console
    this.setState({
      height: this.myRef.offsetHeight,
    });
  }

  render() {
    this.props.getHeight(this.state.height);
    // eslint-disable-next-line no-console
    // console.log(this.myRef.offsetHeight);
    let key = 100;
    const elements = this.props.movieGenres.map((numMovieGenres) => {
      const name = this.props.allGenres.reduce((sum, objGenres) => {
        if (objGenres.id === numMovieGenres) {
          return sum + objGenres.name;
        }
        return sum;
      }, "");

      return (
        <button key={key++} disabled>
          {name}
        </button>
      );
    });

    return (
      // eslint-disable-next-line no-return-assign
      <div className="genre" ref={(myRef) => (this.myRef = myRef)}>
        {elements}
      </div>
    );
  }
}

Genres.defaultProps = {};

Genres.propTypes = {
  allGenres: PropTypes.array,
  movieGenres: PropTypes.array,
};

// export default Genres;

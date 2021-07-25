import React from "react";
import PropTypes from "prop-types";

const Genres = ({ allGenres, movieGenres }) => {
  const elements = movieGenres.map((numMovieGenres) => {
    let key = 100;
    const name = allGenres.reduce((sum, objGenres) => {
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

  return <div className="genre">{elements}</div>;
};

Genres.defaultProps = {};

Genres.propTypes = {
  allGenres: PropTypes.arrayOf().isRequired,
  movieGenres: PropTypes.number,
};

export default Genres;

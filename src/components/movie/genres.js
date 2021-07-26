import React from "react";
import PropTypes from "prop-types";

const Genres = ({ allGenres, movieGenres }) => {
  let key = 100;
  // console.log(allGenres);
  // console.log(movieGenres);
  const elements = movieGenres.map((numMovieGenres) => {
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
  allGenres: PropTypes.array,
  movieGenres: PropTypes.array,
};

export default Genres;

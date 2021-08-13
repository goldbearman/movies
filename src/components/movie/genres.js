import React from "react";
import PropTypes from "prop-types";

// const useResize = (myRef) => {
//   // eslint-disable-next-line no-console
//   console.log(myRef);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//
//   const handleResize = () => {
//     setWidth(myRef.current.offsetWidth);
//     setHeight(myRef.current.offsetHeight);
//   };
//
//   useEffect(() => {
//     // eslint-disable-next-line no-unused-expressions
//     myRef.current && myRef.current.addEventListener("resize", handleResize);
//
//     return () => {
//       myRef.current.removeEventListener("resize", handleResize);
//     };
//   }, [myRef]);
//
//   return { width, height };
// };

const Genres = ({ allGenres, movieGenres }) => {
  let key = 100;
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

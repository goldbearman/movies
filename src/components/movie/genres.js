import React from 'react'


const Genres = ({allGenres, movieGenres}) => {
    // console.log(allGenres);
    // console.log(movieGenres);
    const elements = movieGenres.map((numMovieGenres) => {
        // console.log(numMovieGenres);
        // if(item.)
        let name =  allGenres.reduce((sum, objGenres) => {
            // console.log(objGenres);
            if (objGenres.id === numMovieGenres) {
                // console.log(objGenres.name)
                return sum + objGenres.name;
            }
            return sum;
        },'')
        // console.log(name);

        return (
            <button disabled>{name}</button>
        );
    });
    // console.log(elements);

    return <div className="genre">{elements}</div>;

}

export default Genres;
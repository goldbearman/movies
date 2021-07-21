import React from 'react'




const Genres =({allGenres,movieGenres})=>{
    const elements = movieGenres.map((item) => {

        allGenres.map((genre)=>{

        })


        const { id } = item;

        return (
            <button> </button>
            // <Task
            //     key={id}
            //     {...item}
            //     onDeleleted={() => onDeleted(id)}
            //     onToggleDone={() => onToggleDone(id)}
            // />
        );
    });

    return <ul className="todo-list">{elements}</ul>;

}

export default Genres;
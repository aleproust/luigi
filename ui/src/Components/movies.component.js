import React, {Component} from 'react'

const Movies = ({movies}) => (
      
        <table>
          <th>Title</th>
          <th>Release Date</th>
          <th>Language</th>
          <th>Genre</th>
          <th>Popularity</th>
          <th>Rating</th>
          {
          
        movies.map(({title, language, popularity, rating,genres, releaseDate }, index) => 
        <tr>  < React.Fragment key={index}>
            <td>{title}</td><td>{releaseDate}</td>
          <td>{language}</td>
          <td>{genres?.map(({name}) =>name).reduce((acc, curr) => `${acc},${curr}`)}</td>
          <td>{popularity}</td>
          <td>{rating}</td>
          
          </React.Fragment>
          </tr>
        )}</table>
      );
export default Movies;
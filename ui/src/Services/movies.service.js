import { apiUrl } from "./Constants/constants.utils"
export function fetchMoviesFromLastMonth(){
  return fetch(`${apiUrl}/movies?releaseMonth=true`, {
    method: 'GET',
    'Accept': 'application/json',
    'Content-Type': 'application/json'

  }).then(res => res.ok ? res.json(): Promise.reject('Fail to request movies'))
  .catch(err => console.error)
}

export function   fetchMoviesByGenre(genreId, sortBy){
  return fetch(`${apiUrl}/movies?genreId=${genreId}&sortBy=${sortBy}`, {
    method: 'GET',
    'Accept': 'application/json',
    'Content-Type': 'application/json'

  }).then(res => res.ok ? res.json(): Promise.reject('Fail to request movies'))
  .catch(err => console.error)
}
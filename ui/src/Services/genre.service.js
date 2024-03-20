import { apiUrl } from "./Constants/constants.utils"
export function fetchGenres(){
  return fetch(`${apiUrl}/genres`, {
    method: 'GET',
    'Accept': 'application/json',
    'Content-Type': 'application/json'

  }).then(res => res.ok ? res.json(): Promise.reject('Fail to request movies'))
  
}

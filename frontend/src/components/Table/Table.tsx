import React from 'react'
import { Movie} from '../../interfaces/movie'

const Table = (props : Movie, index:number ) => {

    const data = props
  return (
     
         
          <tr>
           <td>{data.id}</td>
            <td>{data.title}</td>
            
            <td>{data.year}</td>
            <td>{data.cost}</td>
            <td> 
              
            <button type="button" className="btn btn-secondary">Edit</button>
            <button type="button" className="btn btn-danger">Delete</button>
            
            </td>
          </tr>

       
  )
}

export default Table
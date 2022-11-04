import React from 'react'
import { Actor } from '../../interfaces'

const ActorTable = (props: Actor) => {

  const data = props
  return (


    <tr>
      <td>{data.id}</td>
      
      <td>{data.firstName}{data.lastName}</td>
      <td>

        <button type="button" className="btn btn-secondary">Edit</button>
        <button type="button" className="btn btn-danger">Delete</button>

      </td>
    </tr>


  )
}

export default ActorTable
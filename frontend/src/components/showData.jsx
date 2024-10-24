import React from 'react'

const ShowData = (props) => {
    const {fname, lname} = props;
  return (
    <div>
        <div>First name: {fname}</div>
        <div>Last name: {lname}</div>
    </div>
  )
}

export default ShowData
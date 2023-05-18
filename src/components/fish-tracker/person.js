/**
 * @namespace Person
 * @description Person component
 *
 * @memberof FishTracker
 *
 * Create a component that will display a person Icon
 *
 */
import React from 'react'

const Person = props => {
  const { name, handsPlayed } = props
  return (
    <div>
      <h1>{name}</h1>
      <h2>{handsPlayed}</h2>
    </div>
  )
}

export default Person

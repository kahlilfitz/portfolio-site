import React from 'react'
import AgeDisplayIcon from './AgeDisplayIcon'
import { ComponentLabel } from './CommonComponent'
import './AgeDisplay.css'

const AGE_THRESHOLD = parseInt(process.env.REACT_APP_AGE_THRESHOLD)

const AgeDisplay = props => {
  const { age } = props
  return (
    <div className="age-container dashboard-component">
      <ComponentLabel labelClass="component-label">
        <div>Age</div>
        <AgeDisplayIcon />
      </ComponentLabel>
      <div className="age-grid">
        <div>
          <div className="age-item">Actual</div>
          <div className="age-item">Threshold</div>
        </div>
        <div>
          <div className="age-item">{age}</div>
          <div className="age-item">{AGE_THRESHOLD}</div>
        </div>
      </div>
    </div>
  )
}

export default AgeDisplay

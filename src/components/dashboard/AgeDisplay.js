import React from 'react'
import AgeDisplayIcon from './AgeDisplayIcon'
import { ComponentLabel } from './CommonComponent'
import {REACT_APP_AGE_THRESHOLD} from './Constants'
import './AgeDisplay.css'

const AGE_THRESHOLD = REACT_APP_AGE_THRESHOLD

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
          <div className="age-item off">Actual</div>
          <div className="age-item off">Threshold</div>
        </div>
        <div>
          <div className="age-item on-nobg">{age}</div>
          <div className="age-item on-nobg">{AGE_THRESHOLD}</div>
        </div>
      </div>
    </div>
  )
}

export default AgeDisplay

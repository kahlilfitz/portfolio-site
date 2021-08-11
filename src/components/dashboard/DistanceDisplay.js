import React from 'react'
import { ComponentLabel } from './CommonComponent'
import './DistanceDisplay.css'
import { REACT_APP_DISTANCE_CLOSE, REACT_APP_DISTANCE_FAR, REACT_APP_DISTANCE_MAX } from './Constants'

const CLOSE_BOUND = REACT_APP_DISTANCE_CLOSE
const FAR_BOUND = REACT_APP_DISTANCE_FAR
const MAX = REACT_APP_DISTANCE_MAX

const DistanceDisplayIcon = _ => {
  return (
    <svg
      width="23"
      height="10"
      viewBox="0 0 23 10"
      className="icon-on"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.7448 0H2.25517C1.03433 0 0.041626 0.897 0.041626 2V8C0.041626 9.103 1.03433 10 2.25517 10H20.7448C21.9656 
            10 22.9583 9.103 22.9583 8V2C22.9583 0.897 21.9656 0 20.7448 0ZM6.29163 5H4.20829V2H6.29163V5ZM10.4583 
            6H8.37496V2H10.4583V6ZM14.625 5H12.5416V2H14.625V5ZM18.7916 6H16.7083V2H18.7916V6Z"
      />
    </svg>
  )
}

const DistanceMeter = props => {
  const { className, distance } = props

  const close_x = (CLOSE_BOUND / MAX) * 493
  const far_x = (FAR_BOUND / MAX) * 493
  const distance_x = (distance / MAX) * 493

  return (
    <svg
      width="493"
      height="50"
      viewBox="0 0 493 50"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0.0" y1="9" x2="493" y2="12" stroke="#0B9CFF" strokeWidth="3" />
      <rect x={far_x} y="0" width="4" height="20" rx="2" fill="#0B9CFF" />
      <rect x={close_x} y="0" width="4" height="20" rx="2" fill="#0B9CFF" />
      <circle cx={distance_x} cy="10" r="10" fill="#70FF7E" />
      <text x={(close_x - 26).toFixed(2)} y="45" className="distance-meter-text">
        {CLOSE_BOUND.toFixed(2)}m
      </text>
      <text x={(far_x - 26).toFixed(2)} y="45" className="distance-meter-text">
        {FAR_BOUND.toFixed(2)}m
      </text>
    </svg>
  )
}

const DistanceDisplay = props => {
  const { distance } = props

  let distanceAssessment = ''
  distanceAssessment =
    distance < CLOSE_BOUND ? ' - Too Close' : distanceAssessment
  distanceAssessment = distance > FAR_BOUND ? ' - Too Far' : distanceAssessment

  return (
    <div className="component-container-1 dashboard-component">
      <ComponentLabel labelClass="component-label">
        <div>Distance</div>
        <DistanceDisplayIcon />
      </ComponentLabel>
      <DistanceMeter className="distance-item" distance={distance} />
      <div className="distance-item">
        <div className="distance-text">
          {distance.toFixed(2)} meters{distanceAssessment}
        </div>
      </div>
    </div>
  )
}

export default DistanceDisplay

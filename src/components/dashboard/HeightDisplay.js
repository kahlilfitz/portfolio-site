import React from 'react'
import { ComponentLabel } from './CommonComponent'
import './HeightDisplay.css'
import { REACT_APP_TALL_BOUND, REACT_APP_HEIGHT_MAX } from './Constants'

const TALL_BOUND = REACT_APP_TALL_BOUND
const MAX = REACT_APP_HEIGHT_MAX

const HeightMeter = props => {
  const { className, height } = props

  const tall_x = (TALL_BOUND / MAX) * 493
  const height_x = (height / MAX) * 493

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
      <rect x={tall_x} y="0" width="4" height="20" rx="2" fill="#0B9CFF" />
      <circle cx={height_x} cy="10" r="10" fill="#70FF7E" />
      <text x={(tall_x - 26).toFixed(2)} y="45" class="distance-meter-text">
        {TALL_BOUND.toFixed(2)}m
      </text>
    </svg>
  )
}

const HeightDisplayIcon = _ => {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      className="icon-on"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 0C5.78 0 6.67 2.16 5.42 3.42C4.16 4.67 2 3.78 2 2C2 1.46957 2.21071 0.960859 2.58579 0.585786C2.96086 0.210714 
            3.46957 0 4 0ZM2.5 5H5.5C6.03043 5 6.53914 5.21071 6.91421 5.58579C7.28929 5.96086 7.5 6.46957 7.5 
            7V12.5H6V20H2V12.5H0.5V7C0.5 6.46957 0.710714 5.96086 1.08579 5.58579C1.46086 5.21071 1.96957 5 2.5 5ZM18 6H12V8H18V6ZM18 
            9H15V11H18V9ZM18 0H12V2H18V0ZM18 3H15V5H18V3ZM18 12H12V14H18V12ZM18 18H12V20H18V18ZM18 15H15V17H18"
      />
    </svg>
  )
}

const HeightDisplay = props => {
  const { height } = props
  let heightAssessment = ''
  heightAssessment = height > TALL_BOUND ? ' - Tall' : heightAssessment

  return (
    <div className="component-container-1 dashboard-component">
      <ComponentLabel labelClass="component-label">
        <div>Height</div>
        <HeightDisplayIcon />
      </ComponentLabel>
      <HeightMeter height={height} className="height-item" />
      <div className="height-item">
        <div className="height-text">
          {height.toFixed(2)} meters{heightAssessment}
        </div>
      </div>
    </div>
  )
}

export default HeightDisplay

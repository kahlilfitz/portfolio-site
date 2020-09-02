import React from 'react'
import './FacialHairDisplay.css'
import { ComponentLabel } from './CommonComponent'
import { REACT_APP_FACE_THRESHOLD } from './Constants'

const FACE_THRESHOLD = REACT_APP_FACE_THRESHOLD

const FacialHairIcon = _ => {
  return (
    <svg
      width="24"
      height="9"
      viewBox="0 0 24 9"
      className="icon-on"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.8632 3.05004C21.5676 5.45886 19.8235 4.80004 16.9603 2.12504C14.5911 
                -0.085253 12.6455 1.2721 12.175 3.17651C11.6985 1.26916 9.75143 -0.0852534 7.38379 2.12945C4.52643 4.80739 2.78232 
                5.46916 0.485257 3.06475C0.257315 5.48534 2.71173 7.75298 5.9632 8.12504C8.97643 8.46916 11.6191 7.06769 12.1764 
                4.93681C12.7397 7.07063 15.3808 8.46769 18.3955 8.11769C21.6441 7.73975 24.0941 5.4721 23.8632 3.05004Z"
      />
    </svg>
  )
}

const FacialHairDisplay = props => {
  const { facialHairData } = props

  const beardConfidence = facialHairData.beard || 0.0
  const sideburnsConfidence = facialHairData.sideburns || 0.0
  const mustacheConfidence = facialHairData.mustache || 0.0

  return (
    <div className="facial-container dashboard-component">
      <ComponentLabel labelClass="component-label">
        <div>Facial Hair</div>
        <FacialHairIcon />
      </ComponentLabel>
      <div className="facial-grid">
        <div>
          <div className="facial-header">Type</div>
          <div className="facial-value">Beard</div>
          <div className="facial-value">SideBurns</div>
          <div className="facial-value">Mustache</div>
        </div>
        <div>
          <div className="facial-header">Actual</div>
          <div className="facial-value">{beardConfidence.toFixed(1)}</div>
          <div className="facial-value">{sideburnsConfidence.toFixed(1)}</div>
          <div className="facial-value">{mustacheConfidence.toFixed(1)}</div>
        </div>
        <div>
          <div className="facial-header">Threshold</div>
          <div className="facial-value">{FACE_THRESHOLD}</div>
          <div className="facial-value">{FACE_THRESHOLD}</div>
          <div className="facial-value">{FACE_THRESHOLD}</div>
        </div>
      </div>
    </div>
  )
}

export default FacialHairDisplay

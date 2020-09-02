import React from 'react'
import { ComponentLabel, ToggleLabel } from './CommonComponent'
import PoseDisplayIcon from './PoseDisplayIcon'
import './PoseDisplay.css'

const PoseSeparator = _ => (
  <svg
    width="1"
    height="93"
    viewBox="0 0 1 93"
    className="pose-separator"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="0.5" y1="93" x2="0.5" stroke="#70FF7E" />
  </svg>
)

const PoseDisplay = props => {
  const { poseDisplayData, people } = props
  const facingPoster = poseDisplayData.user_orientation === 'poster'

  return (
    <div className="component-container-1 dashboard-component layout-column-around">
      <ComponentLabel labelClass="component-label">
        <div>Pose</div>
        <PoseDisplayIcon />
      </ComponentLabel>
      <div className="layout-row-nowrap evenly">
        <div>
          <ToggleLabel
            labelClass="component-toggle-3"
            on={poseDisplayData.right_hand.up}
          >
            <div>Right Arm Up</div>
          </ToggleLabel>
          <ToggleLabel
            labelClass="component-toggle-3"
            on={!poseDisplayData.right_hand.up}
          >
            <div>Right Arm Down</div>
          </ToggleLabel>
        </div>
        <PoseSeparator />
        <div>
          <ToggleLabel
            labelClass="component-toggle-3"
            on={poseDisplayData.left_hand.up}
          >
            <div>Left Arm Up</div>
          </ToggleLabel>
          <ToggleLabel
            labelClass="component-toggle-3"
            on={!poseDisplayData.left_hand.up}
          >
            <div>Left Arm Down</div>
          </ToggleLabel>
        </div>
        <PoseSeparator />
        <div>
          <ToggleLabel labelClass="component-toggle-3" on={facingPoster}>
            <div>Facing Front</div>
          </ToggleLabel>
          <ToggleLabel labelClass="component-toggle-3" on={!facingPoster}>
            <div>Facing Away</div>
          </ToggleLabel>
        </div>
        <PoseSeparator />
        <div>
          <ToggleLabel labelClass="component-toggle-4" on={true}>
            <div># of People</div>
            <div className="component-font-larger">{people}</div>
          </ToggleLabel>
        </div>
      </div>
    </div>
  )
}

export default PoseDisplay

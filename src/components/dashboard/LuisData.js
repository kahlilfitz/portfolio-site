import React from 'react'
import './LuisData.css'
import { ComponentLabel } from './CommonComponent'

const LuisDataIcon = _ => {
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      className="icon-on"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.72026 21.0783C2.41473 21.0769 2.12224 20.9544 1.90691 20.7376C1.69159 20.5209 1.57101 20.2276 1.5716 
                19.9221C1.57428 19.8059 1.59241 19.6906 1.62551 19.5793L2.45297 16.5862C2.48756 16.4756 2.44848 16.3642 2.39772 
                16.2762L2.38783 16.2582C2.38424 16.2524 2.36717 16.2286 2.35504 16.2111C2.34291 16.1935 2.32899 16.1747 2.31641 
                16.1562L2.30787 16.1441C1.26306 14.5605 0.706207 12.705 0.706408 10.8079C0.698322 8.2208 1.71041 5.7766 3.55715 
                3.92223C5.46813 2.00766 8.02418 0.95334 10.7608 0.95334C13.0824 0.952193 15.3351 1.74186 17.1478 3.19225C18.92 
                4.61852 20.1517 6.60631 20.6162 8.79311C20.7592 9.45742 20.8312 10.1351 20.831 10.8146C20.831 13.4618 19.8139 
                15.9483 17.9667 17.8166C16.1034 19.7033 13.6012 20.7392 10.9216 20.7392C9.97828 20.7392 8.77123 20.4984 8.19174 
                20.3349C7.49455 20.1399 6.83375 19.8857 6.76098 19.8587C6.68396 19.8292 6.60222 19.814 6.51975 19.8138C6.4303 
                19.8132 6.34167 19.8308 6.2592 19.8654L6.22102 19.8803L3.18969 20.9755C3.04081 21.0381 2.8817 21.073 2.72026 
                21.0783Z"
      />
    </svg>
  )
}

const LuisData = props => {
  const { speechData } = props

  return (
    <div className="luis-data dashboard-component">
      <ComponentLabel labelClass="component-label">
        <div>LUIS Speech</div>
        <LuisDataIcon />
      </ComponentLabel>
      <div className="luis-grid">
        <div>
          <div className="luis-label">Intent</div>
          <div className="luis-label">Recognized</div>
        </div>
        <div>
          <div className="luis-speechdata">- {speechData.intent}</div>
          <div className="luis-speechdata">- {speechData.text}</div>
        </div>
      </div>
    </div>
  )
}

export default LuisData

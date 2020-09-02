import React from 'react'
import './AccessoriesDisplay.css'
import { ComponentLabel } from './CommonComponent'
import { REACT_APP_ACCESSORIES_THRESHOLD } from './Constants'

const ACC_THRESHOLD = REACT_APP_ACCESSORIES_THRESHOLD

const AccessoriesDisplayIcon = _ => {
  return (
    <svg
      width="23"
      height="10"
      viewBox="0 0 23 10"
      className="icon-on"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9252 1.50024H21.3929C21.1464 1.35465 20.8844 1.23706 20.6117 1.14966C19.7523 0.865479 18.6176 0.718994 
                17.2377 0.718994C15.8578 0.718994 14.723 0.865479 13.8656 1.14966C13.1791 1.37866 12.8768 1.6311 12.7792 
                1.72925C12.4639 1.5785 12.1189 1.50025 11.7694 1.50025C11.4199 1.50025 11.0749 1.5785 10.7596 1.72925C10.662 
                1.63159 10.3597 1.37866 9.67322 1.14966C8.81482 0.865479 7.68005 0.718994 6.30017 0.718994C4.92029 0.718994 
                3.78552 0.865479 2.9281 1.14966C2.65544 1.23706 2.3934 1.35465 2.14685 1.50024H1.61267C1.40547 1.50024 1.20676 
                1.58255 1.06024 1.72907C0.913731 1.87558 0.831421 2.07429 0.831421 2.28149C0.831421 2.48869 0.913731 2.68741 
                1.06024 2.83392C1.20676 2.98043 1.40547 3.06274 1.61267 3.06274H1.62097C1.6698 5.28247 1.93542 6.61646 2.50525 
                7.56616C2.8622 8.17932 3.40941 8.65932 4.06384 8.93335C4.66101 9.18921 5.39294 9.31372 6.30017 9.31372C7.47937 
                9.31372 9.15564 9.13257 10.0951 7.56714C10.5677 6.77905 10.8319 5.72681 10.9354 4.12378C10.9698 4.0345 10.9875 
                3.93967 10.9877 3.84399C10.9877 3.63679 11.07 3.43808 11.2165 3.29157C11.363 3.14505 11.5617 3.06274 11.7689 
                3.06274C11.9761 3.06274 12.1748 3.14505 12.3213 3.29157C12.4679 3.43808 12.5502 3.63679 12.5502 3.84399C12.5504 
                3.93934 12.5681 4.03383 12.6024 4.1228C12.7059 5.72583 12.9701 6.77808 13.4427 7.56616C13.7997 8.17932 14.3469 
                8.65932 15.0013 8.93335C15.5985 9.18921 16.3304 9.31372 17.2377 9.31372C18.4169 9.31372 20.0931 9.13257 21.0326 
                7.56714C21.6024 6.61743 21.869 5.28345 21.9169 3.06372H21.9252C22.1324 3.06372 22.3311 2.98141 22.4776 2.8349C22.6241 
                2.68839 22.7064 2.48967 22.7064 2.28247C22.7064 2.07527 22.6241 1.87656 22.4776 1.73004C22.3311 1.58353 22.1324 1.50122 
                21.9252 1.50122V1.50024Z"
      />
    </svg>
  )
}

const AccessoriesDisplay = props => {
  const { accessoriesData } = props
  let headwearConfidence = 0.0
  let glassesConfidence = 0.0

  for (const accObj of accessoriesData) {
    if (accObj.type === 'headWear') {
      headwearConfidence = accObj.confidence
    }
    if (accObj.type === 'glasses') {
      glassesConfidence = accObj.confidence
    }
  }

  return (
    <div className="accessory-container dashboard-component">
      <ComponentLabel labelClass="component-label">
        <div>Accessories</div>
        <AccessoriesDisplayIcon />
      </ComponentLabel>
      <div className="accessory-grid">
        <div>
          <div className="accessory-grid-column-header">Item</div>
          <div className="accessory-grid-row-header">Headwear</div>
          <div className="accessory-grid-row-header">Glasses</div>
        </div>
        <div>
          <div className="accessory-grid-column-header">Actual</div>
          <div className="accessory-grid-value">
            {headwearConfidence.toFixed(1)}
          </div>
          <div className="accessory-grid-value">
            {glassesConfidence.toFixed(1)}
          </div>
        </div>
        <div>
          <div className="accessory-grid-column-header">Threshold</div>
          <div className="accessory-grid-value">{ACC_THRESHOLD}</div>
          <div className="accessory-grid-value">{ACC_THRESHOLD}</div>
        </div>
      </div>
    </div>
  )
}

export default AccessoriesDisplay

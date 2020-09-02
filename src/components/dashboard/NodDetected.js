import React from 'react'
import { ComponentLabel, ToggleLabel } from './CommonComponent'
import './NodDetected.css'

const NodIcon = _ => {
  return (
    <svg
      width="17"
      height="19"
      viewBox="0 0 17 19"
      className="icon-on"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.54174 0.125C5.61466 0.125 2.44799 3.19792 2.25007 7.0625L0.250072 9.69792C7.17342e-05 10.0208 0.250072 10.5417 
                0.687572 10.5417H2.25007V13.6667C2.25007 14.8229 3.17715 15.75 4.33341 15.75H5.37507V18.875H12.6667V13.9896C15.1355 
                12.8229 16.8334 10.3333 16.8334 7.41667C16.8334 3.39583 13.5834 0.125 9.54174 0.125ZM10.5834 
                11.5833H8.50007V9.5H10.5834V11.5833ZM12.4063 6.17708C12.1042 6.59375 11.7188 6.89583 11.2501 7.14583C10.9897 7.3125 
                10.8126 7.48958 10.7188 7.6875C10.6251 7.875 10.5834 8.13542 10.5834 8.45833H8.50007C8.50007 7.9375 8.61466 7.5 8.82299 
                7.22917C9.02091 6.94792 9.38549 6.63542 9.91674 6.28125C10.1876 6.11458 10.4063 5.90625 10.5522 5.66667C10.7188 
                5.42708 10.7917 5.14583 10.7917 4.8125C10.7917 4.5 10.7084 4.22917 10.5209 4.03125C10.3334 3.84375 10.0626 3.73958 
                9.73965 3.73958C9.48913 3.73415 9.24504 3.81921 9.05215 3.97917C8.86465 4.14583 8.77091 4.38542 8.76049 
                4.69792H6.75007L6.73966 4.66667C6.72924 3.84375 7.00007 3.25 7.54174 2.82292C8.10424 2.41667 8.8334 2.20833 9.73965 
                2.20833C10.7084 2.20833 11.4688 2.44792 12.0209 2.91667C12.5834 3.38542 12.8647 4.02083 12.8647 4.8125C12.8647 5.33333 
                12.7084 5.76042 12.4063 6.17708Z"
      />
    </svg>
  )
}

const NodDetected = props => {
  const { nodData } = props

  return (
    <div className="nod-detected dashboard-component">
      <ComponentLabel labelClass="component-label">
        <div>Nod</div>
        <NodIcon />
      </ComponentLabel>
      <ToggleLabel labelClass="component-toggle-1" on={nodData === 'yes'}>
        <div>Yes</div>
      </ToggleLabel>
      <ToggleLabel labelClass="component-toggle-1" on={nodData === 'no'}>
        <div>No</div>
      </ToggleLabel>
    </div>
  )
}

export default NodDetected

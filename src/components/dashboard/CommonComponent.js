import React from 'react'
import './CommonComponent.css'

export const ToggleLabel = props => {
  const { on, labelClass, children } = props
  const onClass = on ? 'on' : 'off'
  return <div className={`${labelClass} ${onClass}`}>{children}</div>
}

export const ComponentLabel = props => {
  const { labelClass, children } = props

  return <div className={labelClass}>{children}</div>
}

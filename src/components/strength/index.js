import React from 'react'
import StrengthItem from './strength-item'

const LINK_POSITIVITY='https://www.gallup.com/cliftonstrengths/en/252305/positivity-theme.aspx'
const LINK_CONNECTEDNESS='https://www.gallup.com/cliftonstrengths/en/252197/connectedness-theme.aspx'
const LINK_INDIVIDUALIZATION='https://www.gallup.com/cliftonstrengths/en/252272/individualization-theme.aspx'
const LINK_ADAPTABILITY='https://www.gallup.com/cliftonstrengths/en/252146/adaptability-theme.aspx'
const LINK_INCLUDER='https://www.gallup.com/cliftonstrengths/en/252266/includer-theme.aspx'


const StrengthBase = () => {
    return (
        <div>
            <StrengthItem text='Positivity' link={LINK_POSITIVITY}></StrengthItem>
            <StrengthItem text='Includer' link={LINK_INCLUDER}></StrengthItem>
            <StrengthItem text='Individualization' link={LINK_INDIVIDUALIZATION}></StrengthItem>
            <StrengthItem text='Adaptability' link={LINK_ADAPTABILITY}></StrengthItem>
            <StrengthItem text='Connectedness' link={LINK_CONNECTEDNESS}></StrengthItem>
        </div>
    )
}

export default StrengthBase
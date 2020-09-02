import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import RobotCharacter, { ROBOT_CONFIG } from '../components/robot/robot-char'
import { Link } from 'gatsby'
import { fromEvent } from 'rxjs'

const CHAR_STATE = [
    ROBOT_CONFIG.IDLE,
    ROBOT_CONFIG.AWAKE,
    ROBOT_CONFIG.RAISE_RIGHT,
    ROBOT_CONFIG.WAVE_RIGHT,
    ROBOT_CONFIG.RAISE_LEFT,
    ROBOT_CONFIG.WAVE_LEFT,
    ROBOT_CONFIG.RAISE_BOTH,
    ROBOT_CONFIG.WAVE_BOTH
]

const RobotIndex = () => {
    const [robotConfig, setRobotConfig] = useState(ROBOT_CONFIG.IDLE)

    useEffect(() => {
        const keypressSubject = fromEvent(document, 'keyup', event => {
            return {
                code: event.code,
                key: event.key,
                altKey: event.altKey,
                ctrlKey: event.ctrlKey,
                shiftKey: event.shiftKey,
                metaKey: event.metaKey
            }
        })

        keypressSubject.subscribe((event) => {
            const keyToInt = parseInt(event.key)
            const newConfig = !isNaN(keyToInt) && CHAR_STATE[keyToInt] ? CHAR_STATE[keyToInt] : ROBOT_CONFIG.IDLE
            if (newConfig) { setRobotConfig(newConfig) }
        })
    }, [])
    return (
        <Layout>
            <Link to="/">Home</Link>
            <h1>Press 0-7 to change robot state.</h1>
            <div className="Character-mode">
                <RobotCharacter
                    charConfig={robotConfig}
                    fillColor="black"
                />
            </div>

        </Layout>
    )
}

export default RobotIndex
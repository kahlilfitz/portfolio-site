import React from 'react'
import './robot-char.css'

export const ROBOT_CONFIG = {
    IDLE: {
        eyesConfig: { open: false },
        leftArmConfig: null,
        rightArmConfig: null
    },
    AWAKE: {
        eyesConfig: { open: true },
        leftArmConfig: null,
        rightArmConfig: null
    },

    WAVE_RIGHT: {
        eyesConfig: { open: true },
        leftArmConfig: null,
        rightArmConfig: { waving: true }
    },
    WAVE_LEFT: {
        eyesConfig: { open: true },
        leftArmConfig: { waving: true },
        rightArmConfig: null
    },
    RAISE_RIGHT: {
        eyesConfig: { open: true },
        leftArmConfig: null,
        rightArmConfig: { waving: false }
    },
    RAISE_LEFT: {
        eyesConfig: { open: true },
        leftArmConfig: { waving: false },
        rightArmConfig: null
    },
    RAISE_BOTH: {
        eyesConfig: { open: true },
        leftArmConfig: { waving: false },
        rightArmConfig: { waving: false }
    },
    WAVE_BOTH: {
        eyesConfig: { open: true },
        leftArmConfig: { waving: true },
        rightArmConfig: { waving: true }
    }
}

const renderBody = (bodyConfig) => {
    return (
        <g id="Layer_DB" data-name="DB Whole">
            {renderTorso()}
            {renderEyes(bodyConfig.eyesConfig)}
            {renderRightArm(bodyConfig.rightArmConfig)}
            {renderLeftArm(bodyConfig.leftArmConfig)}
        </g>
    )
}

const renderTorso = (torsoConfig) => {
    return (
        <g id="Layer_Body">
            <rect x="36.5" y="56.5" width="229" height="268" rx="70.36" />
            <ellipse cx="151" cy="122" rx="114.5" ry="121.5" />
            <ellipse className="DB-cls-1" cx="151.5" cy="81" rx="84.5" ry="56" />
            <rect className="DB-cls-1" x="67" y="69" width="169" height="69" rx="15.19" />
            <ellipse className="DB-cls-2" cx="151.5" cy="325.5" rx="46" ry="31" />
        </g>
    )
}

const renderEyes = (eyesConfig) => {
    if (eyesConfig.open) {
        return (
            <g id="Layer_Eyes">
                <circle className="DB-cls-2" cx="108.73" cy="101.25" r="20.25" />
                <circle className="DB-cls-2" cx="193.25" cy="101.25" r="20.25" />
            </g>
        )
    }
    return (
        <g id="Layer_Eyes">
            <rect className="DB-cls-2" x="88.5" y="96.5" width="40" height="10" />
            <rect className="DB-cls-2" x="173.5" y="96.5" width="40" height="10" />
        </g>
    )

}

const renderLeftArm = (armConfig) => {
    if (armConfig) {
        if (armConfig.waving) {
            return (
                <g id="Layer_Left_Arm"
                    className="DB-cls-2 Wave-anim Wave-left">
                    <rect x="281.36" y="74.84" width="10" height="114" transform="translate(49.9 -76.65) rotate(16.68)" />
                    <ellipse cx="304.67" cy="74.07" rx="20" ry="12.5" transform="translate(106.01 316.65) rotate(-64.35)" />
                    <ellipse cx="265.5" cy="180" rx="18" ry="23.5" />
                </g>
            )
        } else {
            return (
                <g id="Layer_Left_Arm" className="DB-cls-2">
                    <rect x="281.36" y="74.84" width="10" height="114" transform="translate(49.9 -76.65) rotate(16.68)" />
                    <ellipse cx="304.67" cy="74.07" rx="20" ry="12.5" transform="translate(106.01 316.65) rotate(-64.35)" />
                    <ellipse cx="265.5" cy="180" rx="18" ry="23.5" />
                </g>
            )
        }

    }

    return (
        <g id="Layer_Left_Arm" className="DB-cls-2">
            <rect className="DB-cls-2" x="274.5" y="177.5" width="10" height="114" transform="translate(592.14 422.56) rotate(171.03)" />
            <ellipse className="DB-cls-2" cx="265.5" cy="180" rx="18" ry="23.5" />
            <ellipse className="DB-cls-2" cx="288" cy="294.5" rx="12.5" ry="20" />
        </g>
    )
}

const renderRightArm = (armConfig) => {
    if (armConfig) {
        if (armConfig.waving) {
            return (
                <g id="Layer_Right_Arm"
                    className="DB-cls-2 Wave-anim Wave-right">
                    <g transform="translate(-17.38 0)">
                        <rect x="28.02" y="74.84" width="10" height="114" transform="translate(102.5 248.66) rotate(163.32)" />
                        <ellipse cx="53.88" cy="180" rx="18" ry="23.5" />
                        <ellipse cx="14.71" cy="74.07" rx="12.5" ry="20" transform="translate(-30.62 13.67) rotate(-25.65)" />
                    </g>
                </g>
            )
        } else {
            return (
                <g id="Layer_Right_Arm" className="DB-cls-2">

                    <g transform="translate(-17.38 0)">
                        <rect x="28.02" y="74.84" width="10" height="114" transform="translate(102.5 248.66) rotate(163.32)" />
                        <ellipse cx="53.88" cy="180" rx="18" ry="23.5" />
                        <ellipse cx="14.71" cy="74.07" rx="12.5" ry="20" transform="translate(-30.62 13.67) rotate(-25.65)" />
                    </g>
                </g>
            )
        }

    }

    return (
        <g id="Layer_Right_Arm" className="DB-cls-2">
            <rect x="17.5" y="177.5" width="10" height="114" transform="translate(36.84 -0.64) rotate(8.97)" />
            <ellipse cx="36.5" cy="180" rx="18" ry="23.5" />
            <ellipse cx="13" cy="294.5" rx="12.5" ry="20" />
        </g>
    )
}

const RobotChar = (props) => {
    return (
        <div className="DBContainer">
            <svg version="1.1"
                viewBox="0 0 301 357"
                className="DB Bounce-anim"
                preserveAspectRatio="xMidYMid meet"
                style={{fill: props.fillColor}}>
                <g>
                    {renderBody(props.charConfig)}
                </g>
            </svg>
        </div>
    )
}

export default RobotChar
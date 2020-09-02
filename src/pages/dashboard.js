import React, { useState, useEffect } from 'react'
import PeopleDetected from '../components/dashboard/PeopleDetected'
import PicturePose from '../components/dashboard/PicturePose'
import NodDetected from '../components/dashboard/NodDetected'
import LuisData from '../components/dashboard/LuisData'
import './dashboard.css'
import PoseDisplay from '../components/dashboard/PoseDisplay'
import DistanceDisplay from '../components/dashboard/DistanceDisplay'
import HeightDisplay from '../components/dashboard/HeightDisplay'
import AccessoriesDisplay from '../components/dashboard/AccessoriesDisplay'
import AgeDisplay from '../components/dashboard/AgeDisplay'
import FacialHairDisplay from '../components/dashboard/FacialHairDisplay'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import { sampleDepthData, samplePoseData, sampleSpeechData, sampleFaceData } from '../components/dashboard/DataEmitter'

const INITIAL_DEPTH_DATA = {
    estimated_distance: 1.5,
    estimated_height: 1.5,
}

const INITIAL_SPEECH_DATA = {
    intent: 'None',
    text: 'Waiting to detect speech',
}

const INITIAL_POSE_DATA = {
    id: 'pose_processor',
    pose: {
        right_hand: { up: true },
        left_hand: { up: false },
        picture: {
            taking_picture: false,
            selfie: true,
        },
        user_orientation: 'poster',
        head_nod: 'no',
    },
    num_people: 1,
}
const INITIAL_FACE_DATA = {
    id: 'face_processor',
    faces: [
        {
            rect: {
                left: 276,
                top: 86,
                right: 380,
                bottom: 190,
            },
            age: 38,
            gender: 'male',
            facial_hair: {
                moustache: 0.6,
                beard: 0.6,
                sideburns: 0.6,
            },
            accessories: [
                { type: 'glasses', confidence: 1 },
                { type: 'headWear', confidence: 0.98 },
            ],
        },
    ],
    framesize: { width: 640, height: 480 },
}

const Dashboard = () => {
    const [depthData, setDepthData] = useState(INITIAL_DEPTH_DATA)
    const [poseData, setPoseData] = useState(INITIAL_POSE_DATA)
    const [faceData, setFaceData] = useState(INITIAL_FACE_DATA)
    const [speechData, setSpeechData] = useState(INITIAL_SPEECH_DATA)

    useEffect(() => {
        sampleDepthData.subscribe(data => {
            setDepthData(data)
        })

        samplePoseData.subscribe(data => {
            setPoseData(data)
        })

        sampleSpeechData.subscribe(data => {
            setSpeechData(data)
        })

        sampleFaceData.subscribe(data => {
            setFaceData(data)
        })

    },
        []
    )


    return (
        <Layout>
            <Link to="/">Home</Link>
            <div className="dashboard-main">
                <div className="dashboard-header">
                    <div className="dashboard-header-title">
                        Interactive Character Dashboard
          </div>
                    <div className="dashboard-header-line"></div>
                </div>
                <div className="layout-container">
                    <div className="layout-group-1">
                        <div className="layout-row-nowrap">
                            <div className="layout-group-1-1-1">
                                <PeopleDetected detected={poseData.num_people > 0} />
                            </div>
                            <PicturePose pictureData={poseData.pose.picture} />
                        </div>
                        <div className="layout-group-1-2">
                            <PoseDisplay
                                poseDisplayData={poseData.pose}
                                people={poseData.num_people}
                            />
                            <DistanceDisplay distance={depthData.estimated_distance} />
                            <HeightDisplay height={depthData.estimated_height} />
                        </div>
                    </div>
                    <div className="layout-group-2">
                        <div className="layout-row-nowrap">
                            <NodDetected nodData={poseData.pose.head_nod} />
                            <LuisData speechData={speechData} />
                        </div>
                        <div className="layout-row-nowrap">
                            <AccessoriesDisplay
                                accessoriesData={faceData.faces[0].accessories}
                            />
                            <AgeDisplay age={faceData.faces[0].age} />
                        </div>
                        <FacialHairDisplay facialHairData={faceData.faces[0].facial_hair} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard

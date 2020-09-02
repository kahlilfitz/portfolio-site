import { interval } from "rxjs";
import { map, throttleTime } from "rxjs/operators";

export const sampleInterval = interval(100)

export const sampleDepthData = sampleInterval.pipe(
    map((val) => (
        {
            id: 'realsense_depth',
            estimated_distance: parseFloat(`${val%210/100}`),
            estimated_height: parseFloat(`1.${val % 99}`),
        }
    ))
)

export const samplePoseData = sampleInterval.pipe(
    map((val) => (
        {
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
            num_people: val%10,
        }
    )),
    throttleTime(1000)
)

export const sampleSpeechData = sampleInterval.pipe(
    map((val) => (
        {
            intent: 'None',
            text: 'Waiting to detect speech',
        }
    ))
)

export const sampleFaceData = sampleInterval.pipe(
    map((val) => (
        {
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
    ))
)

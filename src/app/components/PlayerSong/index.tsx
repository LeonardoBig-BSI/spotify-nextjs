import { faBackwardStep, faCirclePause, faCirclePlay, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface PlayerSongProps {
    duration: string;
    audio: string;
    randomIdFromArtist: string;
    randomId2FromArtist: string;
}

const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor(timeInSeconds - Number(minutes) * 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;
};

const timeInSeconds = (timeString: string) => {
    const splitArray = timeString.split(":");
    const minutes = Number(splitArray[0]);
    const seconds = Number(splitArray[1]);

    return seconds + minutes * 60;
};

export default function PlayerSong({ duration, audio, randomIdFromArtist, randomId2FromArtist }: PlayerSongProps) {
    const audioPlayer = useRef<HTMLAudioElement>(null)
    const progressBar = useRef<HTMLDivElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(formatTime(0))
    const durationInSeconds = timeInSeconds(duration)

    const playPause = () => {
        if (!audioPlayer.current) {
            return console.log("Ref is null")
        }

        isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play()

        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {

            if (isPlaying && audioPlayer.current) {
                setCurrentTime(formatTime(audioPlayer.current.currentTime));

                if (progressBar.current) {
                    progressBar.current.style.setProperty(
                        "--_progress",
                        ((audioPlayer.current.currentTime / durationInSeconds) * 100).toString() + "%"
                    );
                }
            }
        }, 100);

        return () => clearInterval(intervalId);

    }, [isPlaying, durationInSeconds])

    return (
        <div className="player">
            <div className="player__controllers">
                <Link href={`/song/${randomIdFromArtist}`}>
                    <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
                </Link>

                <FontAwesomeIcon
                    className="player__icon player__icon--play"
                    icon={isPlaying ? faCirclePause : faCirclePlay}
                    // onClick={() => playPause()}
                    onClick={playPause}
                />

                <Link href={`/song/${randomId2FromArtist}`}>
                    <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
                </Link>
            </div>

            <div className="player__progress">
                <p>{currentTime}</p>

                <div className="player__bar">
                    <div ref={progressBar} className="player__bar-progress"></div>
                </div>

                <p>{duration}</p>
            </div>

            {/* <audio ref={audioPlayer} src={audio}></audio> */}
            {audio && <audio ref={audioPlayer} src={audio}></audio>}
        </div>
    )
}
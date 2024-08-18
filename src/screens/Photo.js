import React, { useState, useRef, useEffect } from 'react'
import './photo_styles.css';
export default function () {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: { width: 1150, height: 500}
        })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                var playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // Automatic playback started!
                        // Show playing UI.
                    })
                    .catch(error => {
                            // Auto-play was prevented
                            // Show paused UI.
                    });
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    const takePhoto = async(e)=>{
        const width = 414;
        const height = width/(16/9);

        let video = videoRef.current;
        let photo = photoRef.current;
        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video,0,0,width,height);
        let url = photo.toDataURL('image/png');
        const response = await fetch("http://localhost:5000/api/camback",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({data:url})
        });
        //const json = response.json();
        setHasPhoto(true);
    }

    const closePhoto = () =>{
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0,0,photo.width,photo.height);
        setHasPhoto(false);
    }

    useEffect(() => {
        getVideo();
    }, [videoRef]);

    let mass = hasPhoto?'hasPhoto':'';
    return (
        <div className='Photo'>
            <div className='camera'>
                <video ref={videoRef}></video>
                <button className='button' onClick={takePhoto}>SNAP!</button>
            </div>
            {/*{'result' + (hasPhoto ? 'hasPhoto' : "")}*/}
            <div className={`result ${mass}`} >
                <canvas ref={photoRef}></canvas>
                <button className='button' onClick={closePhoto}>Close!</button>
            </div>
        </div>
    )
}

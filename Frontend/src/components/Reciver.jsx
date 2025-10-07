import { useEffect, useRef } from "react"

export const Receiver = () => {
    const videoRef = useRef(null);
    
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:4000");
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'receiver'
            }));
        }
        startReceiving(socket);
    }, []);

    function startReceiving(socket = WebSocket) {
        // const video = document.createElement("video");
        // video.autoplay = true;
        // video.playsInline = true;
        // video.muted = true;   // important: prevents NotAllowedError
        // video.controls = true;
        // document.body.appendChild(video);

        const pc = new RTCPeerConnection({
            iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
        ]});

        // pc.ontrack = (event) => {
        //     console.log("Got remote track:", event.streams);
        //     video.srcObject = event.streams[0];
        //     video.play().catch(err => console.error("Autoplay failed:", err));
        // }
        pc.ontrack = (event) => {
            console.log("Got remote track:", event.streams);
            if (videoRef.current) {
                
                videoRef.current.srcObject = event.streams[0];
                videoRef.current.play().catch(err => console.error("Autoplay failed:", err));
            }
        }


        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createOffer') {
                pc.setRemoteDescription(message.sdp).then(() => {
                    pc.createAnswer().then((answer) => {
                        pc.setLocalDescription(answer);
                        socket.send(JSON.stringify({
                            type: 'createAnswer',
                            sdp: answer
                        }));
                    });
                });
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }
    }

    return (
        <video
        ref={videoRef}
        autoPlay
        playsInline
        muted       // required for autoplay on mobile
        controls
        style={{ width: "100%", height: "80vh", backgroundColor: "#000" }}
        />
    )
}
import { useState, useRef } from 'react';

function App() {
  const [mediaStream, setMediaStream] = useState(null);
  const [showStartPipButton, setShowStartPipButton] = useState(false);
  const [isPipActive, setIsPipActive] = useState(false);
  const videoElement = useRef(null);

  async function selectMediaStream() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia();
      setMediaStream(stream);
      videoElement.current.srcObject = stream;
      setShowStartPipButton(true);
    } catch (error) {
      console.error('Error selecting media stream:', error);
    }
  }

  function handleStartPip() {
    videoElement.current.play().then(() => {
      videoElement.current
        .requestPictureInPicture()
        .then(() => {
          setIsPipActive(true);
          setShowStartPipButton(false);
        })
        .catch((error) => {
          console.error('Failed to start Picture in Picture', error);
        });
    });
  }

  function stopPictureInPicture() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setIsPipActive(false);
      setMediaStream(null);
      setShowStartPipButton(false);
      document.exitPictureInPicture().catch((error) => {
        console.error('Error exiting Picture in Picture:', error);
      });
    }
  }

  return (
    <div className='app'>
      {!showStartPipButton && !isPipActive && (
        <div className='button-container'>
          <button onClick={selectMediaStream}>Share Screen</button>
        </div>
      )}
      {showStartPipButton && (
        <div className='button-container'>
          <button onClick={handleStartPip}>Start Picture in Picture</button>
        </div>
      )}
      {isPipActive && (
        <div className='button-container'>
          <button onClick={stopPictureInPicture}>Stop</button>
        </div>
      )}
      <video ref={videoElement} controls className='hiddenVideo'></video>
    </div>
  );
}

export default App;

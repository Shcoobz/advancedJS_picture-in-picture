import { useState, useRef } from 'react';

/**
 * Defines the main application component that handles media streaming and Picture in Picture functionality.
 */
function App() {
  /**
   * @const {MediaStream|null} mediaStream - Holds the current media stream, or null if no stream is active.
   */
  const [mediaStream, setMediaStream] = useState(null);

  /**
   * @const {boolean} showStartPipButton - Controls visibility of the 'Start Picture in Picture' button.
   */
  const [showStartPipButton, setShowStartPipButton] = useState(false);

  /**
   * @const {boolean} isPipActive - Tracks whether Picture in Picture mode is currently active.
   */
  const [isPipActive, setIsPipActive] = useState(false);

  /**
   * @const {Object} videoElement - Ref to the video DOM element used for media streaming.
   */
  const videoElement = useRef(null);

  /**
   * Asynchronously selects a media stream to display and sets up initial state for PiP functionality.
   * @async
   * @returns {Promise<void>} - A Promise that resolves when the stream is successfully selected.
   */
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

  /**
   * Handles initiation of Picture in Picture mode after starting the media playback.
   * @returns {Promise<void>} - A Promise that resolves when PiP has started or an error has occurred.
   */
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

  /**
   * Stops the Picture in Picture mode and the media stream, resetting the application state.
   * @returns {void}
   */
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

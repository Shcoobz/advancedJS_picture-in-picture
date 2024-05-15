# react_Picture in Picture: [LIVE DEMO](https://shcoobz.github.io/react_picture-in-picture/)

![react_Picture in Picture](public/img/react-picture-in-picture.png)

## Summary

react_Picture in Picture provides a simple and effective way to manage screen sharing and Picture in Picture functionality within a React application. It features an intuitive interface that allows users to start and stop media streams and to control Picture in Picture mode seamlessly.

The core functionality includes:

- Screen sharing with just a click.
- Starting and stopping Picture in Picture mode.
- Seamless transition between sharing and PiP modes.
- Automatic stream management.

## Features

### Screen Sharing

Allows users to share their screen with others via a media stream. This feature uses the browser's native capabilities to select and share the screen.

### Picture in Picture Control

Users can easily switch to Picture in Picture mode, allowing them to continue other tasks while keeping an eye on the video stream in a small, adjustable window.

### Stream Management

Efficiently manages the media stream lifecycle, including starting, stopping, and error handling, ensuring a smooth user experience.

### Additional Features

- Responsive UI that adapts to different device screens.
- Error handling to manage issues during stream selection or PiP activation.

## Technologies

- React: A JavaScript library for building user interfaces.
- CSS: For styling and positioning elements on the page.
- Browser APIs: Utilizes `navigator.mediaDevices.getDisplayMedia` and `document.pictureInPictureElement` for handling media streams and PiP functionality.

---

_Note: This document provides an overview of react_Picture in Picture. For detailed instructions and more information, please refer to the source code documentation._

_This project is a conversion from an earlier version built with vanilla JavaScript and HTML, available [here](https://github.com/Shcoobz/basicJS_picture-in-picture/). This conversion integrates React to enhance UI reactivity and maintainability._

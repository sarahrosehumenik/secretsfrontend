import React, { useState } from 'react';
import GifPicker from 'gif-picker-react';
import './GifViewer.css';


export default function GifViewer({ handleToggleViewer, setSelectedGif }) {

 const handleGifClick = (tenorImage) => {
  setSelectedGif(tenorImage);
  handleToggleViewer();

 };


 return (
  <div className='overlay'>
   <div className="viewer-container">
    <div className="close-wrapper">
     <div onClick={() => handleToggleViewer()} className="close-button">X</div>
    </div>
    <GifPicker
     tenorApiKey={"AIzaSyB3kNbWlROPNaSBiqXX1_a9isO-Yyr5RxQ"}
     onGifClick={handleGifClick}
    />
   </div>
  </div >
 );
}
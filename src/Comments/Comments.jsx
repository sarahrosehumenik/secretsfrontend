import React, { useState, useEffect, useRef } from 'react';
import './Comments.css';
import GifViewer from '../GifViewer/GifViewer';
import { addCommentToSecret } from '../utils/comments-queries';
import Gif from "../Svg/gif.svg";




export default function Comments({ user, secret, setSecrets, handleReadMoreClick, showAllComments, setShowAllComments }) {


  const [validImageMap, setValidImageMap] = useState({});
  const [toggleViewer, setToggleViewer] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);
  const [updatedSecretState, setUpdatedSecretState] = useState(null);
  const [commentText, setCommentText] = useState('');



  function isImageValid(url, callback) {
    const img = new Image();
    img.onload = function () {
      callback(true);
    };
    img.onerror = function () {
      callback(false);
    };
    img.src = url;
  }
  useEffect(() => {
    // Check the validity of image URLs when the component mounts or when comments change
    const updatedValidImageMap = {};
    secret.comments.forEach((comment, index) => {
      if (comment.image) {
        isImageValid(comment.image, (isValid) => {
          updatedValidImageMap[index] = isValid;
          setValidImageMap(updatedValidImageMap);
        });
      }
    });

  }, [secret.comments, updatedSecretState]);

  const displayedComments = (secretId) => {
    const isExpanded = showAllComments[secretId]
    console.log(isExpanded)
    return isExpanded ? secret.comments : secret.comments.slice(0, 1);
  }

  const handleToggleViewer = () => {
    setToggleViewer(!toggleViewer);
  };

  function localCommentDate() {

    return displayedComments(secret._id).map((comment, index) => {
      const utcDate = new Date(comment.createdAt);
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));
      const formattedCommentDate = localDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      return formattedCommentDate;
    })

  }

  const commentDate = localCommentDate();




  const handleCommentSubmit = async () => {
    try {
      const updatedSecret = await addCommentToSecret(secret._id, {
        comments: commentText,
        image: selectedGif ? selectedGif.preview.url : null,
        user: user.profileUser._id,
        userName: user.profileUser.name,
      });

      setSecrets((prevSecrets) => {
        // Check if the secret with the same _id already exists in the state
        const existingSecretIndex = prevSecrets.findIndex((prevSecret) => prevSecret._id === updatedSecret._id);
        if (existingSecretIndex !== -1) {
          const updatedSecrets = [...prevSecrets];
          updatedSecrets[existingSecretIndex] = updatedSecret;
          return updatedSecrets;
        } else {
          return [...prevSecrets, updatedSecret];
        }
      });
      if (showAllComments) {
        handleReadMoreClick(secret._id)
      }
      setSelectedGif(null);
      setCommentText('');
      setUpdatedSecretState(updatedSecret);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };


  return (
    <div className={showAllComments ? "comment-wrapper" : "comment-wrapper-small"} >
      <div onClick={() => handleReadMoreClick(secret._id)} className="comment-header">Comments
        <div className="comment-count">
          {secret.comments.length > 0 ? secret.comments.length : "0"}
        </div>
      </div>
      {displayedComments(secret._id).map((comment, index) => (
        <div className="comment-item" id={comment._id} key={comment._id}>
          <div className="comment-info-wrapper">
            <div className="comment-name-text">{comment.userName}</div>
            <div className="comment-date-text">{commentDate[index]}</div>
          </div>
          <div className="comment-text">{comment.comments}
          </div>
          {comment.image && validImageMap[index] ? (
            <img className="comment-image" src={comment.image} alt="comment" />
          ) : null}
        </div>
      ))}
      {secret.comments.length > 1 ?
        <div className="read-more-wrapper">
          <div className="read-more-text" onClick={() => handleReadMoreClick(secret._id)}>
            {showAllComments[secret._id] ? "Say Less" : "Read More"}</div>
        </div>
        : null}
      <div className="comment-post-wrapper">
        <div className="form-section">
          <div className="input-wrapper">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></input>
          </div>
          <div className="post-buttons-wrapper">
            {toggleViewer ?
              <GifViewer setSelectedGif={setSelectedGif} handleToggleViewer={handleToggleViewer} />
              : null}
            <img src={Gif} onClick={() => handleToggleViewer()} className="picture-upload-button"></img>
            <button onClick={handleCommentSubmit} className="comment-button">Comment</button>
          </div>
        </div>
        {selectedGif ?
          <div className="preview-container">
            <div className="image-border">
              <div onClick={() => setSelectedGif(null)} className="close-preview-button"> X </div>
              <img className="gif-preview" src={selectedGif.preview.url} alt="gif" />
            </div>
          </div>
          : null}
      </div>
    </div>
  )



}
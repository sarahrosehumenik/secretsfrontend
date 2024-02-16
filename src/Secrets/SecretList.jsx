import React, { useEffect, useState } from 'react';
import { secretsList } from '../utils/secrets-queries';
import './SecretList.css';
import Comments from '../Comments/Comments';
import { Link } from 'react-router-dom';

export default function SecretList({ secrets, setSecrets, user, handleReadMoreClick, showAllComments, setShowAllComments }) {
 console.log(secrets)


 useEffect(() => {
  const apiUrl = `${process.env.API_URL} + /secrets`;
  secretsList(apiUrl, setSecrets);
 }, []);

 function localDate() {
  console.log(secrets)
  return secrets.length > 0 ? secrets.map((secret, index) => {
   const utcDate = new Date(secret.createdAt);
   const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));
   const formattedDate = localDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
   });
   return formattedDate;
  }) : "";
 }
 const date = localDate();



 return (
  <div className="secret-list-wrapper">
   {secrets.map((secret, index) => (
    <div id={secret._id} className="secret-item" key={index}>
     <div className="post-info-wrapper">
      <Link to={`/profile/${secret.user}`} className="name-text">{secret.userName}</Link>
      <div className="date-text">{date[index]}</div>
     </div>
     <div className="secret-text">{secret.yourSecret}</div>
     <div className="comment-container">
      <Comments
       handleReadMoreClick={handleReadMoreClick}
       showAllComments={showAllComments}
       setShowAllComments={setShowAllComments}
       setSecrets={setSecrets}
       user={user}
       secret={secret} />
     </div>
    </div>
   ))}
  </div>
 );
}
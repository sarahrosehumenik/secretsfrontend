import { useParams } from "react-router-dom";
import './SecretDetail.css';
import Comments from "../Comments/Comments";
import { Link } from 'react-router-dom';

export default function SecretDetail({ user, secrets, setSecrets, setShowAllComments, showAllComments, handleReadMoreClick }) {

  const { id } = useParams();
  const secret = secrets.find((secret) => secret._id === id);



  function localDate() {
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

  }
  const date = localDate();

  //i realize i could make a secret item component to not make redundant code but this was a last minute add on and i may fix it later if i think about it too much 

  return (
    <div className="detail-container">
      <Link to="/" className="back-button">{"<-"}&nbsp;Back</Link>
      <div className="secret-item" >
        <div className="post-info-wrapper">
          <div className="name-text">{secret.userName}</div>
          <div className="date-text">{date}</div>
        </div>
        <div className="secret-text">{secret.yourSecret}</div>
        <div className="comment-container">
          <Comments
            setSecrets={setSecrets}
            user={user}
            secret={secret}
            handleReadMoreClick={handleReadMoreClick}
            showAllComments={showAllComments}
            setShowAllComments={setShowAllComments} />
        </div>
      </div>
    </div>
  );
}
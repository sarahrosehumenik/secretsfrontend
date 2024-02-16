
import './Notifications.css';
import { Link } from 'react-router-dom';


export default function Notifications({ user, toggleNotifications }) {


  function secretsWithComments() {
    const secretsToStore = [];

    user?.secrets?.forEach((secret) => {
      const commentsByLoggedInUser = secret.comments.some((comment) => comment.user === user.profileUser._id);

      if (!commentsByLoggedInUser) {
        secretsToStore.push({
          yourSecret: secret.yourSecret,
          id: secret._id,
          comments: secret.comments.filter((comment) => comment.user !== user.profileUser._id),
        });
      }
    });

    return secretsToStore;
  }

  const secretComments = secretsWithComments();
  function localDate(comment) {
    const utcDate = new Date(comment.createdAt);
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

  return (
    <div className={toggleNotifications ? "notifications-container" : "notifications-closed"}>
      <div className="notification-wrapper">
        {secretComments.map((secret, index) => (
          <>
            {secret.comments.map((comment, index) => (
              <>
                {comment.comments.length > 0 ?
                  <Link to={`/${secret.id}`} className="notification-item">
                    <div><strong>{comment.userName}</strong> commented <em>"{comment.comments.slice(0, 10)}..."</em> on your post: <strong>{secret.yourSecret.slice(0, 6)}..</strong>  </div>
                    <div className="notification-date">{localDate(comment)}</div>
                  </Link>
                  : null}
              </>
            ))}
          </>
        ))}
      </div>
    </div>
  )

}
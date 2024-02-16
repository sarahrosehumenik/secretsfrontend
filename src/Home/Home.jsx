import React, { useState } from 'react'
import './Home.css'
import SecretList from '../Secrets/SecretList'
import { Link } from 'react-router-dom'
import SecretForm from '../Secrets/SecretForm'
import Notifications from '../Notifications/Notifications'
import { GoogleLogin } from 'react-google-login';


export default function Home({ user, secrets, setSecrets, showAllComments, setShowAllComments, handleReadMoreClick, responseGoogle }) {

  const [toggleNotifications, setToggleNotifications] = useState(false);

  function handleToggleNotifications() {
    setToggleNotifications(!toggleNotifications)
  }

  console.log(user)
  return (
    <div className="home-wrapper">
      {user ?
        <>
          <div className="user-info-container">
            <div className='user-info-wrapper'>
              <div className="website-title">Secrets Make Friends</div>
              <div className="header-wrapper">
                <div className="image-wrapper">
                  <img className="user-picture" src={user.profileUser.img} alt="user" />
                </div>
                <div className="link-wrapper">
                  <div className="home-header">{user.profileUser.name}</div>
                  <Link to={`/profile/${user.profileUser._id}`} className="profile-link">View Profile</Link>
                </div>
              </div>
            </div>
            <div onClick={() => handleToggleNotifications()} className="user-comments">Notifications <div>{toggleNotifications ? "🤝" : "🤚"}</div></div>

            <div className={toggleNotifications ? "notification-section-wrapper" : "notification-section-closed"} >
              <Notifications toggleNotifications={toggleNotifications} user={user} />
            </div>
          </div>
          <div className="feed-container">
            <div className="input-container">
              <SecretForm
                user={user}
                setSecrets={setSecrets} />
            </div>
            <SecretList
              user={user}
              secrets={secrets}
              setSecrets={setSecrets}
              showAllComments={showAllComments}
              setShowAllComments={setShowAllComments}
              handleReadMoreClick={handleReadMoreClick} />
          </div>
        </>
        :
        <div className="login-container">
          <div className="login-wrapper">
            <div className="login-header">Welcome to Secrets Make Friends</div>
            <div>🍵</div>

            <div className="login-text">Please log in to view and post secrets</div>
            <div className="login-button-wrapper">
              <GoogleLogin
                clientId="1001833171495-hmhvql5mvfu05uhpteb0umnm0es337vf.apps.googleusercontent.com"
                buttonText="Login/Sign Up"
                onSuccess={() => responseGoogle}
                onFailure={() => responseGoogle}
                prompt="select_account"
                cookiePolicy="single_host_origin"
                render={renderProps => (
                  <button onClick={renderProps.onClick} className="login-button">Login/Sign up</button>
                )}
              />
              <div className="login-info">With Google</div>
              <div className="terms-header">Terms and Conditions</div>
              <div className="terms">Any users participating in hate speech are subject to being banned</div>

            </div>
          </div>
        </div>

      }
    </div >
  )
}
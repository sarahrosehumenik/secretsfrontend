import React, { useState, useEffect } from 'react'
import './Profile.css'
import { Link, useParams } from 'react-router-dom'
import { addProfileComment } from '../utils/users-queries';
import { getAllUsers } from '../utils/users-queries';


export default function Profile({ user, userList, setUserList }) {
  console.log(userList)
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);


  const foundUser = userList.find((user) => user._id === id);

  useEffect(() => {
    setProfileUser(foundUser);
  }, [profileUser, userList]);


  console.log(profileUser)
  const [toggleSecretInfo, setToggleSecretInfo] = useState(false);
  const [toggleId, setToggleId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [toggleProfileEdit, setToggleProfileEdit] = useState(false);
  const [selectedColor, setSelectedColor] = useState('rgb(242, 253, 240)');
  const [selectedOpaqueColor, setSelectedOpaqueColor] = useState('0.2');
  const [selectedButtonColor, setSelectedButtonColor] = useState('rgb(140, 205, 147)');
  const [editStatus, setEditStatus] = useState(false);


  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    function convertToOpaqueColor(hexColor, opacity) {
      // Convert hex color to RGB
      const hex = hexColor.replace(/^#/, '');
      const bigint = parseInt(hex, 16);
      const red = (bigint >> 16) & 255;
      const green = (bigint >> 8) & 255;
      const blue = bigint & 255;

      // Return RGBA color with the specified opacity
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    }
    const opaqueColor = convertToOpaqueColor(event.target.value, 0.2);
    setSelectedOpaqueColor(opaqueColor);
  };



  const handleSubmitComment = async (e) => {
    e.preventDefault();
    console.log(user)

    try {
      const commentData = {
        profileComments: commentText,
        userName: user.profileUser.name,
      }
      console.log(commentData)

      const updatedUser = await addProfileComment(user.profileUser._id, commentData);
      console.log('Updated user with new profile comment:', updatedUser);

      // Update the user list by updating the specific user in the original user list
      const fetchAllUsers = async () => {
        try {
          const users = await getAllUsers(setUserList);
          return users
        } catch (error) {
          console.error('Error fetching all users:', error);
          return
        }
      };

      fetchAllUsers();

      // Update the user list state using setUserList
      // Optionally, you can clear the form fields after successful submission
      setCommentText('');

    } catch (error) {
      console.error('Error adding profile comment:', error);
    }
  };


  function handleToggleSecretInfo(secretId) {
    // Close the current item if it's open, or toggle the state
    if (toggleSecretInfo && toggleId === secretId) {
      setToggleSecretInfo(false);
      setToggleId(null);
    } else {
      setToggleSecretInfo(true);
      setToggleId(secretId);
    }

  }

  function localDate() {
    return profileUser?.secrets.map((secret, index) => {
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
    })
  }
  const date = localDate();

  return (
    <div style={{ backgroundColor: `${selectedColor}` }} className="profile-container">
      {profileUser ?
        <>
          <div className="column-section">
            <div className="profile-header">
              {toggleProfileEdit ?
                <div>
                  <label htmlFor="colorPicker">Edit Background Color: </label>
                  <input
                    type="color"
                    id="colorPicker"
                    value={selectedColor}
                    onChange={handleColorChange}
                  />
                  <div onClick={() => setToggleProfileEdit(!toggleProfileEdit)} className="edit-profile-button">Edit Profile</div>
                </div>

                :
                <>
                  <div className="profile-header-section1">
                    <div className="profile-image-wrapper">
                      <img className="profile-image" src={profileUser?.img} alt="user" />
                    </div>
                  </div>
                  <div className="profile-header-section2">
                    <div className="profile-name">{profileUser?.name}</div>
                    <div style={{ backgroundColor: `${selectedOpaqueColor}` }} className="profile-status">
                      <div className="status-header">Status:
                        <div className="edit-button" onClick={() => setEditStatus(!editStatus)}>✏️</div>
                      </div>
                      {editStatus ?
                        <div>
                          <input placeholder={profileUser.status}></input>
                          <button>Save</button>
                          <button onClick={() => setEditStatus(!editStatus)}>Cancel</button>
                        </div> :
                        <div className="status-text">{profileUser.status}</div>
                      }
                    </div>
                    <div className="section1-text">
                      <div onClick={() => setToggleProfileEdit(!toggleProfileEdit)} className="edit-profile-button">Edit Profile</div>
                    </div>
                  </div>
                </>
              }
            </div>
            <div className="profile-comments-container">
              <div className="profile-comments-header">Comment on &nbsp;<strong>{profileUser?.name}'s</strong>&nbsp; Profile</div>
              <div style={{ backgroundColor: `${selectedOpaqueColor}` }} className="comment-post-wrapper">
                <div className="form-section">
                  <div className="input-wrapper">
                    <input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></input>
                  </div>
                  <div className="post-buttons-wrapper">

                    <button
                      style={{ backgroundColor: `${selectedButtonColor}` }}
                      onClick={handleSubmitComment}
                      className="comment-button">Comment</button>
                  </div>
                </div>

              </div>
              <div className="comments-wrapper">
                {profileUser?.profileComments?.map((comment, index) => (

                  <div className="comment-item profile">
                    <div className="comment-info-wrapper">
                      <div className="comment-name-text">{comment.userName}</div>
                    </div>
                    <div classname="comment-text">{comment.profileComments}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row-section">
            <div className="secrets-container">
              <div style={{ backgroundColor: `${selectedOpaqueColor}` }} className="your-secrets-header"><strong>{profileUser?.name}'s</strong>&nbsp; Secrets</div>
              <div className="secrets-wrapper">
                {profileUser?.secrets?.map((secret, index) => (
                  <div onClick={() => handleToggleSecretInfo(secret._id)} key={index} className="secret-profile-item">
                    <div className="secret-profile-text">{secret.yourSecret}</div>
                    {/* {toggleSecretInfo && secret._id === toggleId ? */}
                    <div className={toggleSecretInfo && secret._id === toggleId ? "toggle-wrapper-open" : "toggle-wrapper-closed"}>
                      <div className="secret-date">{date[index]}</div>
                      <div className="comment-count-profile"> Comments: {secret.comments.length}</div>
                      <Link to={`/${secret._id}`} className="secret-detail-button">View {"->"}</Link>
                    </div>
                    {/* : null} */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
        : <div className='load'>Loading...</div>}
    </div >
  )
}
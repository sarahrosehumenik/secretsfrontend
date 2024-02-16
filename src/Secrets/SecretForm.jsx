import React, { useState } from 'react';
import { createSecret } from '../utils/secrets-queries';
import './SecretList.css';

const SecretForm = ({ setSecrets, user }) => {
 const [secretContent, setSecretContent] = useState('');
 console.log(user.profileUser._id)
 const handleCreateSecret = async () => {
  try {
   // Assuming you have the user ID and other necessary data
   const secretData = {
    yourSecret: secretContent,
    user: user.profileUser._id, // Replace with the actual user ID
    userName: user.profileUser.name,
    comments: [],

   };
   console.log(secretData)

   await createSecret('http://secrets-project6969.herokuapp.com/secrets', secretData, setSecrets);
  } catch (error) {
   console.error('Error creating secret:', error);
  }
 };

 return (
  <>
   <textarea value={secretContent} onChange={(e) => setSecretContent(e.target.value)} placeholder='Spill the Tea 🍵' className="secret-submission-input"></textarea>
   <div className="submit-wrapper">
    <button onClick={handleCreateSecret} className="submit-secret">Post</button>
   </div>
  </>
 );
};

export default SecretForm;
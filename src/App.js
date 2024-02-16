import './App.css';
import React, { useEffect, useState } from 'react';
import { getUserById, getAllUsers } from './utils/users-queries';
import Home from './Home/Home';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {Link, Route, Routes} from 'react-router-dom'
import SecretDetail from './Secrets/SecretDetail';
import Profile from './Profile/Profile';







function App() {

  const [user, setUser] = useState(null)
  const [secrets, setSecrets] = useState([]);
  const [userList, setUserList] = useState([])
  const [showAllComments, setShowAllComments] = useState({});

 const handleReadMoreClick = (secretId) => {
  const getSecretById = document.getElementById(secretId);
  console.log(getSecretById)
  if (getSecretById) {
   getSecretById.scrollIntoView({ behavior: 'smooth', block: "start" });
  }
  setShowAllComments((prev) => {
   const newState = { ...prev };
   newState[secretId] = !newState[secretId];
   return newState;
  });
 };


    useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }

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

  }, []);


  const  responseGoogle = (response) => {
    const userData = response
    console.log(userData)
    getUserById(userData.googleId).then((data) => {
    
      setUser(data)
      localStorage.setItem('userData', JSON.stringify(data));
      })

  };
  
const logout = () => {
  console.log('Logging out...');
  localStorage.removeItem('userData');
  setUser(null); // Make sure to set the user state to null
};


  return (
    <div className="master-container">
   {user ?
       <div className="nav-container">
        <Link className="home-link" to="/">🍵
          </Link>

       <GoogleLogout
        clientId="1001833171495-hmhvql5mvfu05uhpteb0umnm0es337vf.apps.googleusercontent.com"  
        buttonText="Logout"
        onLogoutSuccess={logout}
       render={renderProps => (
      <button onClick={renderProps.onClick} className="auth-button">Logout</button>
    )}
      />

      </div>
 : null
//     <div className="auth-button">
//  <GoogleLogin
//  clientId="1001833171495-hmhvql5mvfu05uhpteb0umnm0es337vf.apps.googleusercontent.com"
//  buttonText="Login"
//  onSuccess={responseGoogle}
//  onFailure={responseGoogle}
//  prompt="select_account" 
//  cookiePolicy="single_host_origin"
//  render={renderProps => (
//       <button onClick={renderProps.onClick} className="auth-button">Login</button>
//     )}
//  />
//  </div>
}
 <Routes>
 <Route path="/" element={
 <Home user={user} 
 secrets={secrets} 
 setSecrets={setSecrets} 
 responseGoogle={responseGoogle}
 setShowAllComments={setShowAllComments}
 showAllComments={showAllComments}
 handleReadMoreClick={handleReadMoreClick}
  />} />
 <Route path="/:id" element={<SecretDetail
  user={user} 
  secrets={secrets} 
  setSecrets={setSecrets}
  setShowAllComments={setShowAllComments}
  showAllComments={showAllComments}
  handleReadMoreClick={handleReadMoreClick}
   />} />
 <Route path="/profile/:id" element={<Profile userList={userList} setUserList={setUserList} user={user}  />} />
 </Routes>
    </div>
  );

}

export default App;

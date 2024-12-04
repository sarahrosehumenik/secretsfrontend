

const apiUrl = 'http://localhost:8000'; // Replace with your actual API endpoint

const getUserById = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const userData = await response.json();
    console.log(userData)
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
};

const getAllUsers = async (setUserList) => {
  try {
    const response = await fetch(`${apiUrl}/users`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();
    console.log(users)
    setUserList(users)
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error; 
  }
};


const addProfileComment = async (userId, commentData) => {
  try {
    const response = await fetch(`${apiUrl}/${userId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error adding profile comment:', error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

export { getUserById , addProfileComment, getAllUsers};
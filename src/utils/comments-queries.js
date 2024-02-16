const addCommentToSecret = async (secretId, commentData) => {
  try {
    const response = await fetch(`http://secrets-project6969.herokuapp.com/secrets/${secretId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedSecret = await response.json();
    return updatedSecret;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export { addCommentToSecret };


export const secretsList = async (apiUrl, setSecrets) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch("http://localhost:8000/secrets", requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setSecrets(data); // Update state with the fetched data
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

export const createSecret = async (apiUrl, secret, setSecrets) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(secret),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    setSecrets((prev) => [...prev, data]); // Update state with the fetched data
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export const fetchUserSecrets = async (userId) => {
  try {
    // Fetch all secrets (adjust the URL as needed)
    const response = await fetch('http://localhost:8000/secrets');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const allSecrets = await response.json();

    // Filter secrets that are created by the specified user
    const userSecrets = allSecrets.filter((secret) => secret.user === userId);

    return userSecrets;
  } catch (error) {
    console.error('Error fetching user secrets:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

import fb from "./firebaseConfig";
import { getToken } from "./components/Auth/Session";
import { User } from './components/Users/User';

const API_URL = `https://us-central1-toptal-project-5f041.cloudfunctions.net/api`

export const getTokenFromFirebase = async (): Promise<string> => {
  const currentUser = fb.auth().currentUser

  if (!currentUser) {
    throw new Error("No current user")
  }

  const refreshToken = true
  return currentUser.getIdToken(refreshToken).then(function (idToken) {
    return idToken
  }).catch(function (error) {
    console.error(error)
    throw error
  });
}

export const getAuthToken = async (): Promise<string> => {
  let token = ''
  try {
    token = await getTokenFromFirebase();
  } catch (e) {
    token = getToken()
  }
  return token;
}

const validateResponse = async (response) => {
  if (response.status >= 300 || response.status < 200) {
    throw await response.json();
  }
}

export const signIn = (email: string, password: string) => {
  return fb.auth().signInWithEmailAndPassword(email, password);
};

export const registerUser = async (email: string, password: string, displayName: string) => {
  const data = {email, password, displayName}

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  await validateResponse(response)
}

export const fetchUsers = async () => {

  const bearerToken = await getAuthToken()

  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'GET',
  }


  const response = await fetch(`${API_URL}/users`, reqOptions)

  return await response.json()

}

export const fetchRestaurants = async () => {
  const bearerToken = await getAuthToken()

  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'GET',
  }

  const response = await fetch(`${API_URL}/restaurants`, reqOptions)

  return await response.json()
}

export const fetchRestaurantById = async (id) => {
  const bearerToken = await getAuthToken()

  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'GET',
  }

  const response = await fetch(`${API_URL}/restaurants/${id}`, reqOptions)

  return await response.json()
}

export const fetchReviewsByRestaurantId = async (id) => {
  const bearerToken = await getAuthHeader()

  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'GET',
  }

  const response = await fetch(`${API_URL}/reviews/${id}`, reqOptions)

  return await response.json()
}

export const pathUser = async (user: User): Promise<void> => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'PATCH',
    body: JSON.stringify(user),
  }
  await fetch(`${API_URL}/users/${user.uid}`, reqOptions)
}

export const deleteUser = async (userId: string) => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'DELETE',
  }
  await fetch(`${API_URL}/users/${userId}`, reqOptions)
}

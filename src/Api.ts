import fb from "./firebaseConfig";
import { getToken, setToken } from "./components/Auth/Session";
import { User } from './components/Admin/Users/User';
import { Restaurant } from '../functions/src/restaurants/restaurant';

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
    setToken(token);
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
  await validateResponse(response);
  return await response.json();
}

export const fetchReviewsByRestaurantId = async (id) => {
  const bearerToken = await getAuthToken()

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

export const postReview = async (id: string, stars: number,
                                 date_of_visit: number,
                                 comment: string) => {

  const data = {stars, date_of_visit, comment}

  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'POST',
    body: JSON.stringify(data)
  }
  await fetch(`${API_URL}/reviews/${id}`, reqOptions)
}

export const fetchPendingReplyReview = async (restaurantId) => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'GET',
  }

  const response = await fetch(`${API_URL}/reviews/${restaurantId}/pending`, reqOptions)
  return response.json()
}

export const deleteRestaurant = async (restaurantId) => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'DELETE',
  }

  await fetch(`${API_URL}/restaurants/${restaurantId}`, reqOptions)
}

export const getUser = async (userId: string) => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'GET',
  }
  const response = await fetch(`${API_URL}/users/${userId}`, reqOptions)
  return response.json()
}

export const patchRestaurant = async (restaurant: Restaurant): Promise<void> => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'PATCH',
    body: JSON.stringify(restaurant),
  }
  await fetch(`${API_URL}/restaurants/${restaurant.id}`, reqOptions)
}

export const patchReview = async (restaurantId: string, reviewId: string, comment: string): Promise<void> => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'PATCH',
    body: JSON.stringify({
      comment
    }),
  }
  const response = await fetch(`${API_URL}/reviews/${restaurantId}/${reviewId}`, reqOptions)
  await validateResponse(response)
}

export const patchReply = async (restaurantId: string, reviewId: string, comment: string): Promise<void> => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'PATCH',
    body: JSON.stringify({
      reply: comment
    }),
  }
  const response = await fetch(`${API_URL}/reviews/${restaurantId}/${reviewId}/reply`, reqOptions)
  await validateResponse(response)
}

export const postRestaurant = async (name: string, city: string, country: string) => {
  const data = {name, city, country}

  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'POST',
    body: JSON.stringify(data)
  }

  const response = await fetch(`${API_URL}/restaurants`, reqOptions)
  return response.json()

}

export const deleteReview = async (restaurantId, reviewId: string) => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'DELETE',
  }

  await fetch(`${API_URL}/reviews/${restaurantId}/${reviewId}`, reqOptions)
}

export const deleteReply = async (restaurantId, reviewId: string) => {
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'DELETE',
  }

  await fetch(`${API_URL}/reviews/${restaurantId}/${reviewId}/reply`, reqOptions)
}

export const postReplyToReview = async (restaurantId: string, reviewId: string, comment: string) => {
  const data = comment
  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'PUT',
    body: JSON.stringify(data)
  }

  await fetch(`${API_URL}/reviews/${restaurantId}/${reviewId}/reply`, reqOptions)
}

export const postRestaurant = async (name: string, city: string, country: string) => {
  const data = {name, city, country}

  const bearerToken = await getAuthToken()
  const reqOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    method: 'POST',
    body: JSON.stringify(data)
  }

  const response = await fetch(`${API_URL}/restaurants`, reqOptions)
  return response.json()

}

import fb from "./firebaseConfig";
import { getToken } from "./components/Auth/Session";

const API_URL = `https://us-central1-toptal-project-5f041.cloudfunctions.net/api`

export const getAuthHeader = async () :Promise<string>=> {
  return getToken();

  // const currentUser = fb.auth().currentUser

  // if(!currentUser){
  //   throw new Error("No current user")
  // }

  // return currentUser.getIdToken().then(function(idToken) {
  //   return idToken
  // }).catch(function(error) {
  //   console.error(error)
  //     throw error
  // });
}

export const signIn = (email: string, password: string) => {
  return fb.auth().signInWithEmailAndPassword(email, password);
};

export const registerUser = (email:string, password:string, displayName: string) => {

  const data = {email, password, displayName}

 return fetch(`${API_URL}/users`, {
  method:'POST', 
  mode:'cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body:JSON.stringify(data),
  })
}

export const fetchUsers = async () => {
  
  const bearerToken = await getAuthHeader()

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
  const bearerToken = await getAuthHeader()

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
  const bearerToken = await getAuthHeader()

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
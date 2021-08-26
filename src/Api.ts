import fb from "./firebaseConfig";

export const getAuthHeader = async () => {

  const currentUser = fb.auth().currentUser

  if(!currentUser){
    throw new Error("No current user")
  }

  currentUser.getIdToken().then(function(idToken) {
    return idToken
  }).catch(function(error) {
    console.log(error)
  });

}

export const signIn = (email: string, password: string) => {
  return fb.auth().signInWithEmailAndPassword(email, password);
};

export const registerUser = (email:string, password:string, displayName: string) => {

  const data = {email, password, displayName}

 return fetch('https://us-central1-toptal-project-5f041.cloudfunctions.net/api/users', {
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

  const response = await fetch("https://us-central1-toptal-project-5f041.cloudfunctions.net/api/users", reqOptions)

  return await response.json()

}

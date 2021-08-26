import { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { AuthContext } from '../Auth/Auth'
import { fetchUsers } from '../../Api';
import fb from '../../firebaseConfig'

const HelloWorld = () => {

  const history = useHistory();
  const logOut = () => {
    fb.auth().signOut();
    history.push('/signin')
  }

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  const getUsers = async () => {
    try {
      console.log("loading...")
      const users = await fetchUsers()
      console.log(users)
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div>
      <h1>Hello World</h1>
      <h2>display name: {currentUser?.displayName}</h2>
      <h3>role: {currentUser?.role}</h3>
      <button onClick={getUsers}>get users</button>
      <button
        onClick={logOut}
      >Log out
      </button>
    </div>
  )
}

export default HelloWorld

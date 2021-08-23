import { useContext } from 'react'
import { AuthContext } from '../Auth/Auth'
import fb from '../../firebaseConfig'

const Home = () => {

    const logOut = () => {
        fb.auth().signOut()
    }

    const { currentUser } = useContext(AuthContext)


    const getUsers = async () => {

        const token = await currentUser.getIdToken()

        const reqOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        try {
            const response = await fetch("https://us-central1-toptal-project-5f041.cloudfunctions.net/api/users", reqOptions)
            const data = await response.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={getUsers}>get users</button>
            <button
                onClick={logOut}
            >Log out</button>
        </div>
    )
}

export default Home
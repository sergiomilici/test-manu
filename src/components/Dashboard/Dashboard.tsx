import { useState, useEffect, useContext } from "react";
import NavBar from "../NavBar/NavBar"
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import { AuthContext } from "../Auth/Auth";
import { fetchRestaurants } from "../../Api";

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`

// New Owner
// newowner@gmail.com
// owner-password

const Dashboard = () => {

    const [isLoading, setIsLoading] = useState(false)

    const { currentUser } = useContext(AuthContext)
    const userId = currentUser?.uid



    return (<>
        <NavBar />
        <Wrapper>
            <Title>Owner Dashboard</Title>
        </Wrapper>
    </>)
}

export default Dashboard
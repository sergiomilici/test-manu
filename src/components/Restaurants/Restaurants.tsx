import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { List, Spin, Button, notification } from 'antd';
import { fetchRestaurants } from '../../Api';
import Title from 'antd/es/typography/Title';
import { HomeOutlined, TrophyOutlined } from "@ant-design/icons";
import NavBar from "../NavBar/NavBar";
import styled from 'styled-components';
import ReviewReplier from '../ReviewReplier/ReviewReplier';

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`
const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<any | []>()
  const [isLoading, setIsLoading] = useState(false)

  const userRole = "owner"

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setIsLoading(true)
        const response = await fetchRestaurants()
        if (response.status === 401) {
          throw new Error("You are unauthorized to perform this action.")
        }
        setRestaurants(response)
      } catch (err) {
        notification.error({
          message: 'Error',
          description:
            err.message
        });
      } finally {
        setIsLoading(false)
      }
    }

    getRestaurants()
  }, [])

  const restaurantsList = restaurants?.restaurants || []

  return (
    <>
      <NavBar />
      <Wrapper>

        {isLoading && <Spin style={{ margin: 'auto' }} size="large" />}

        {!isLoading && restaurantsList && <List
          itemLayout="vertical"
          header={<Title>Restaurants List</Title>}
          bordered
          dataSource={restaurantsList}
          renderItem={(restaurant: any) => (
            <>
              <List.Item
                style={{
                  textAlign: 'left',
                }}
                key={restaurant.id}>
                <HomeOutlined style={{ marginRight: '8px' }} />
                <Link
                  style={{
                    color: 'inherit',
                    textDecoration: 'underline',
                  }}
                  to={{
                    pathname: `/restaurant/${restaurant.id}`,
                  }}
                >
                  <h3 style={{ display: 'inline', }}>{restaurant.name}</h3>
                </Link>
                <h4 style={{ display: 'block', margin: '0px', marginLeft: 'auto', }}>
                  {restaurant.avg_rating === 0 ? <p><TrophyOutlined /> This restaurant is not rated yet</p> : <p><TrophyOutlined /> Current Rating: {restaurant.avg_rating.toFixed(1)}</p>}
                </h4>
                {userRole === "owner" && <ReviewReplier restaurantId={restaurant.id} />}
              </List.Item>
            </>
          )
          }
        />}

      </Wrapper>
    </>
  )
}

export default Restaurants

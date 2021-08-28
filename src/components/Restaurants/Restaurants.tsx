import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { List, Spin } from 'antd';
import { fetchRestaurants } from '../../Api';
import { HomeOutlined } from "@ant-design/icons";
import NavBar from "../NavBar/NavBar";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<any | []>()
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const getRestaurants = async () => {
      try {
        setIsLoading(true)
        const restaurants = await fetchRestaurants()
        setRestaurants(restaurants)
      } catch (err) {
        console.log(err)
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
      <div style={{
        width: '500px',
        margin: 'auto',
        textAlign: 'center',
      }}
      >

        {isLoading && <Spin style={{ margin: 'auto' }} size="large" />}

        {!isLoading && restaurantsList && <List
          itemLayout="horizontal"
          header={<div>All restaurants</div>}
          bordered
          dataSource={restaurantsList}
          renderItem={(restaurant: any, index: number) => (
            <>
              <List.Item
                style={{ justifyContent: 'flex-start', }}
                key={index}>
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
                  {restaurant.name}
                </Link>
              </List.Item>

            </>
          )
          }
        />}

      </div >
    </>
  )
}

export default Restaurants

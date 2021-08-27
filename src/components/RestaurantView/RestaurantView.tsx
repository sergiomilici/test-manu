import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import NavBar from "../Restaurants/NavBar/NavBar";
import ReviewForm from "../ReviewForm/ReviewForm";

const RestaurantView = () => {

    const [restaurant, setRestaurant] = useState<undefined | {}>()

    const restaurantId = useParams().id

    useEffect(() => {

    }, [])

    return (
        <>
            <NavBar />
            <Card
                title="Resto Name"
                style={{ width: 500, margin: 'auto', }} >
                <HomeOutlined />
                <p>resto city</p>
                <p>resto country</p>
                <p>current rating: 0</p>
            </Card>
            <ReviewForm />
        </>
    )
}

export default RestaurantView
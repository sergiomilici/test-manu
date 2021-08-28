import { Card } from "antd"
import { EnvironmentOutlined, DislikeOutlined, TrophyOutlined, LikeOutlined } from "@ant-design/icons";

const RestaurantCard = (restaurant) => {

    return (
        <Card style={{ marginBottom: '15px', }}
            title={restaurant.restaurant.name}
        >
            <p><EnvironmentOutlined /> {restaurant.restaurant.city}</p>

            {restaurant.restaurant.avg_rating === 0 ? <p><TrophyOutlined /> This restaurant is not rated yet</p> : <p><TrophyOutlined /> Current Rating: {restaurant.restaurant.avg_rating}</p>}

            {restaurant.restaurant.highest_rated_review &&
                <div
                    style={{ marginBottom: '10px', padding: '8px', backgroundColor: '#EDF7ED', color: '#1E4620' }}
                >
                    <p>Highest review:</p>
                    <p><LikeOutlined /> {restaurant.restaurant.highest_rated_review.comment}</p>
                </div>
            }

            {restaurant.restaurant.lowest_rated_review &&
                <div
                    style={{
                        padding: '8px',
                        color: '#611A15',
                        backgroundColor: '#FDECEA'
                    }}
                >
                    <p>Lowest review:</p>
                    <p><DislikeOutlined /> {restaurant.restaurant.highest_rated_review.comment}</p>
                </div>
            }

        </Card>
    )
}

export default RestaurantCard
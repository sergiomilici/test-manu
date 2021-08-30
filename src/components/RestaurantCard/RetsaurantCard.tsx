import { Card } from "antd"
import { EnvironmentOutlined, DislikeOutlined, TrophyOutlined, LikeOutlined } from "@ant-design/icons";

const RestaurantCard = ({ restaurant }) => {

    return (
        <Card style={{ marginBottom: '15px', }}
            title={<h2 style={{ marginBottom: '0px', }}>{restaurant.name}</h2>}
        >
            <p><EnvironmentOutlined /> {restaurant.city}</p>

            {<p><TrophyOutlined /> {restaurant.avg_rating === 0 ? 'This restaurant is not rated yet' : `Current rating: ${restaurant.avg_rating.toFixed(1)}`} </p>}

            {restaurant.highest_rated_review &&
                <div
                    style={{ borderRadius: '4px', marginBottom: '10px', padding: '8px', backgroundColor: '#EDF7ED', color: '#1E4620' }}
                >
                    <p>Highest review:</p>
                    <p><LikeOutlined /> {restaurant.highest_rated_review.comment}</p>
                </div>
            }

            {restaurant.lowest_rated_review &&
                <div
                    style={{
                        borderRadius: '4px',
                        padding: '8px',
                        color: '#611A15',
                        backgroundColor: '#FDECEA'
                    }}
                >
                    <p>Lowest review:</p>
                    <p><DislikeOutlined /> {restaurant.lowest_rated_review.comment}</p>
                </div>
            }

        </Card>
    )
}

export default RestaurantCard
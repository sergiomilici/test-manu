import { Card } from "antd"
import { EnvironmentOutlined, DislikeOutlined, StarOutlined, LikeOutlined } from "@ant-design/icons";

const RestaurantCard = ({ restaurant }) => {

    return (
        <Card style={{ marginBottom: '15px', }}
            title={<h2 style={{ whiteSpace: 'break-spaces', marginBottom: '0px', }}>{restaurant.name}</h2>}
        >
            <p style={{ fontSize: '15px' }}><EnvironmentOutlined /> {restaurant.city}</p>

            {<p style={{ fontSize: '15px' }}><StarOutlined /> {restaurant.avg_rating === 0 ? 'This restaurant is not rated yet' : `Current rating: ${restaurant.avg_rating.toFixed(1)}`} </p>}

            {restaurant.highest_rated_review &&
                <div
                    style={{ borderRadius: '4px', marginBottom: '10px', padding: '8px', backgroundColor: '#EDF7ED', color: '#1E4620' }}
                >
                    <p style={{ fontSize: '16px', fontWeight: 'bold', }}><LikeOutlined /> Highest rated review:</p>
                    <p style={{ margin: '0px', }}> {restaurant.highest_rated_review.comment}</p>
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
                    <p style={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold' }}><DislikeOutlined /> <span style={{ marginLeft: '3px', }}>Lowest rated review:</span></p>
                    <p style={{ margin: '0px', }}> {restaurant.lowest_rated_review.comment}</p>
                </div>
            }

        </Card>
    )
}

export default RestaurantCard
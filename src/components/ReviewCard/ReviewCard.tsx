import { Comment } from "antd"
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

const ReviewCard = ({ review }) => {
    console.log(review)
    return (
        <Comment
            style={{ border: '1px solid #eee', marginBottom: '15px', padding: '10px', }}
            avatar={<UserOutlined />}
            datetime={<span>{moment.unix(review.date_of_visit).format("MM-DD-YYYY")}</span>
            }
            content={
                <>
                    <i>Rating: {review.stars}</i>
                    <p>{review.comment}</p>
                </>
            }
        >

        </Comment>
    )
}

export default ReviewCard
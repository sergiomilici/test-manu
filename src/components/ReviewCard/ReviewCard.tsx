import { Comment } from "antd"
import { FormOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from 'styled-components';

const OwnerReply = styled.div`
text-decoration:underline; 
margin-right:3px;
display:inline;
`

const ReviewCard = ({ review }) => {
    return (
        <Comment
            style={{ border: '1px solid #eee', marginBottom: '15px', padding: '10px', }}
            avatar={<FormOutlined />}
            datetime={<span>Visited on: {moment.unix(review.date_of_visit).format("MM-DD-YYYY")}</span>
            }
            content={
                <>
                    <i>User Rating: {review.stars}</i>
                    <p>{review.comment}</p>
                </>
            }
        >
            {review.reply && <div style={{
                backgroundColor: '#eee',
                padding: '4px',
                borderRadius: '4px',
            }}><OwnerReply>Reply by owner:</OwnerReply>{review.reply}</div>}
        </Comment>
    )
}

export default ReviewCard
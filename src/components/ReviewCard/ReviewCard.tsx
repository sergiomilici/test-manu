import { Comment } from "antd"
import { FormOutlined, StarOutlined, MessageOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from 'styled-components';

const OwnerReply = styled.div`

`

const ReviewCard = ({ review }) => {
    return (
        <Comment
            style={{ border: '1px solid #eee', marginBottom: '15px', padding: '10px', }}
            avatar={<FormOutlined />}
            datetime={<span style={{ fontSize: '13px', }}>Visited on: {moment.unix(review.date_of_visit).format("MM-DD-YYYY")}</span>
            }
            content={
                <>
                    <p>Username placeholder</p>
                    <p style={{ marginBottom: '4px', }}>{review.stars} <StarOutlined /></p>
                    <i style={{ fontSize: '17px', }} >{review.comment}</i>
                </>
            }
        >
            {review.reply && <OwnerReply style={{
                backgroundColor: '#eee',
                padding: '6px',
                borderRadius: '4px',
            }}>
                <MessageOutlined />
                <span style={{ marginLeft: '3px', fontWeight: 'bold', }}>
                    Owner's reply: </span>{review.reply}</OwnerReply>}
        </Comment>
    )
}

export default ReviewCard
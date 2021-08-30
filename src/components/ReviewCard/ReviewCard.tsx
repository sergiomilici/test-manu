import { Comment, Rate } from "antd"
import { FormOutlined, MessageOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from 'styled-components';
import { useFetchUser } from '../Admin/useFetchUser';

const OwnerReply = styled.div`

`

const ReviewCard = ({ review }) => {
    const {isLoading:isLoadingUser, data}=useFetchUser(review.comment_user_id);
    const user = data[0]
    return (
        <Comment
            style={{ border: '1px solid #eee', marginBottom: '15px', padding: '10px', }}
            avatar={<FormOutlined />}
            datetime={<span style={{ fontSize: '13px', }}>Visited on: {moment.unix(review.date_of_visit).format("MM-DD-YYYY")}</span>
            }
            content={
                <>
                {isLoadingUser ? 'Loading...': <p>{user?.displayName || 'User'}</p>}
                    <p style={{ marginBottom: '4px', }}><Rate value={review.stars} disabled={true} style={{fontSize:'12px'}}/></p>
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

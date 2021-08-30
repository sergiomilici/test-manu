import { Result, Button } from 'antd';
import { useHistory } from "react-router-dom";

const PageNotFound = () => {

    const history = useHistory();
    const handleRedirectFrom404 = () => {
        history.push('/restaurants')
    }

    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={handleRedirectFrom404} type="primary">Back To Restaurants List</Button>}
    />
}

export default PageNotFound
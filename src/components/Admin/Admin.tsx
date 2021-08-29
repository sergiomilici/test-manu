import { Tabs } from 'antd';
import { Users } from './Users/Users';
import NavBar from '../NavBar/NavBar';
import { Restaurants } from './Restaurants/Restaurants';

const {TabPane} = Tabs;

export const Admin = () => {
  return (
    <>
      <NavBar />
      <Tabs defaultActiveKey="restaurants" style={{padding: '0 20px 20px 20px'}}>
        <TabPane tab="Restaurants" key="restaurants">
          <Restaurants />
        </TabPane>
        <TabPane tab="Users" key="users">
          <Users />
        </TabPane>
      </Tabs>
    </>
  )
}

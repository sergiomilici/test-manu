import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { User } from './User';
import { RemoveUser } from './RemoveUser';

const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface IGetTableProps {
  onEditUser: (user: User) => void;
  onUserRemoved: (user: User) => void;
}

export const getTableColumn = ({onEditUser, onUserRemoved}: IGetTableProps) => ([
  {
    title: 'ID',
    dataIndex: 'uid',
    key: 'uid',
  },
  {
    title: 'Display Name',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
  },
  {
    title: 'Creation Time',
    key: 'creationTime',
    dataIndex: 'creationTime',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, user) => {
      return (
        <IconsWrapper>
          <RemoveUser user={user} onRemoveUser={onUserRemoved} />

          <Button shape="circle" icon={<EditOutlined />} onClick={() => onEditUser(user)} />
        </IconsWrapper>
      )
    }
  }
]);

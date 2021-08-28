import { User } from './User';
import { getTableColumn } from './tableColumn';
import { useMemo } from 'react';
import { Table } from 'antd';
import { format } from 'date-fns'

interface IUsersTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onUserRemoved: (user: User) => void;
}

const mapUserRows = (users: User[]) => {
  return users.map(user => ({
    key: user.uid,
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    role: user.role,
    creationTime: format(new Date(user.creationTime), 'MM/dd/yyyy')
  }))
}

export const UsersTable = ({users, onEditUser,onUserRemoved}: IUsersTableProps) => {
  const userRows = useMemo(() => {
    return mapUserRows(users)
  }, [users])

  return (
    <Table
      size="small"
      pagination={false}
      columns={getTableColumn({onEditUser,onUserRemoved})}
      dataSource={userRows}
    />)
}

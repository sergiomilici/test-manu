import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Input, Spin } from 'antd';
import { fetchUsers } from '../../Api';
import { User } from './User';
import Title from 'antd/es/typography/Title';
import { UsersTable } from './UsersTable';
import { matchString } from '../../utils/RegExpUtils';
import { SetUserModal } from './SetUser/SetUserModal';
import NavBar from "../NavBar/NavBar"

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`

export const Users = () => {
  const [filterUsersText, setFilterUsersText] = useState<string>('');
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoadingUsers(true);
        const response = await fetchUsers();
        setUsers(response.users);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter(u => matchString(filterUsersText, u.displayName) || matchString(filterUsersText, u.email))
      .sort(function compare(user1, user2) {
        if (user1.uid < user2.uid) {
          return -1;
        }
        if (user1.displayName > user2.uid) {
          return 1;
        }
        return 0;
      })
  }, [users, filterUsersText])

  const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFilterUsersText(event.target.value || '')
  }, []);

  return (
    <>
      <NavBar />
      <Wrapper>
        <Title>Users</Title>
        {!loadingUsers &&
          <>
            <Input placeholder="Filter users"
              onChange={onSearch}
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <UsersTable
              users={filteredUsers}
              onEditUser={(user: User) => {
                setEditingUser(user);
                setIsModalOpen(true);
              }}
              onUserRemoved={(user: User) => {
                setUsers(users.filter(u => u.uid !== user.uid))
              }}
            />
            {editingUser &&
              <SetUserModal
                isModalOpen={isModalOpen}
                user={editingUser}
                onClose={() => setIsModalOpen(false)}
                onUserEdited={(user) => {
                  const filteredUsers = users.filter(u => u.uid !== user.uid);
                  filteredUsers.push(user);
                  setUsers(filteredUsers);
                  setIsModalOpen(false);
                }}
              />
            }
          </>}
        {loadingUsers && <Spin />}
      </Wrapper>
    </>
  )
}

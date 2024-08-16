import { useParams } from '@remix-run/react';
import { useEffect } from 'react';
import { useSocket } from '~/app/models/hooks/use-socket';
import { useUsers } from '~/users/models/hooks';
import UserList from './user-side-list';

const UserSideListContainer = () => {
  const params = useParams();
  const [{ users, state, total }, { fetch }] = useUsers();
  const { loggedInUsers } = useSocket();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <UserList loggedInUsers={loggedInUsers} selectedUserId={params.id} users={users} state={state} total={total} />
  );
};

export default UserSideListContainer;

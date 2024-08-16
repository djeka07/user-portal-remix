import { CreateUserItem } from '~/users/components/create-user-item';
import { grid, root } from './users.css';
import { AdminContainer } from '~/auth/components/admins';
import { UsersResponse } from '~/users/models/services/generated/user.generated';
import { NoAccessUsers } from '~/users/components/no-access-users';
import { Typography } from '@djeka07/ui';

type UsersViewProps = {
  usersNoAccess?: Promise<UsersResponse>;
};

const UsersView = ({ usersNoAccess }: UsersViewProps) => {
  return (
    <div className={root}>
      <Typography variant="h1">Users</Typography>
      <div className={grid}>
        <AdminContainer>
          <NoAccessUsers usersNoAccess={usersNoAccess} />
        </AdminContainer>
        <CreateUserItem />
      </div>
    </div>
  );
};

export default UsersView;

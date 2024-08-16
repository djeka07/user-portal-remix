import { UserHeaderContainer } from '~/users/components/user-header';
import { UserResponse } from '~/users/models/services/generated/user.generated';

type UserViewProps = {
  id: string;
  user: UserResponse | undefined;
};

const UserView = ({ user }: UserViewProps) => (
  <>
    <UserHeaderContainer user={user!} />
  </>
);

export default UserView;

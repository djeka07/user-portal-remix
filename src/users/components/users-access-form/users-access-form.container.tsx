import { GetApplicationsResponse, UsersResponse } from '~/users/models/services/generated/user.generated';
import UserAccessForm from './users-access-form';

type UsersAccessFormContainerProps = {
  users: Promise<UsersResponse>;
  applicatons: Promise<GetApplicationsResponse>;
};

const UserAccessFormContainer = ({ applicatons, users }: UsersAccessFormContainerProps) => {
  return <UserAccessForm users={users} applicatons={applicatons} />;
};

export default UserAccessFormContainer;

import { UserResponse } from '~/users/models/services/generated/user.generated';
import ResetUserPassword from './reset-user-password';

type ResetUserPasswordContainerProps = {
  user: UserResponse;
  onClose?: () => void;
};

const ResetUserPasswordContainer = ({ user, onClose }: ResetUserPasswordContainerProps) => {
  return <ResetUserPassword action={`/users/${user?.id}`} user={user} onCancel={onClose} onSuccess={onClose} />;
};

export default ResetUserPasswordContainer;

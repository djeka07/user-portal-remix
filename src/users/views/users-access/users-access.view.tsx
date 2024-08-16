// import { UserAccessFormContainer } from '~/user/components/users-access-form';
import { root } from './users-access.css';
import { useTranslation } from 'react-i18next';
import { GetApplicationsResponse, UsersResponse } from '~/users/models/services/generated/user.generated';
import { UserAccessFormContainer } from '~/users/components/users-access-form';
import { Typography } from '@djeka07/ui';

type UsersAccessViewProps = {
  applications: Promise<GetApplicationsResponse>;
  users: Promise<UsersResponse>;
};

const UsersAccessView = ({ applications, users }: UsersAccessViewProps) => {
  const { t } = useTranslation();
  return (
    <div className={root}>
      <Typography variant="h1">{t('users:access:title')}</Typography>
      <UserAccessFormContainer applicatons={applications} users={users} />
    </div>
  );
};

export default UsersAccessView;

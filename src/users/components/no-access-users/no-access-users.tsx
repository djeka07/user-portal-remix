import { Await, useNavigate } from '@remix-run/react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '~/app/components/lists';
import { UsersResponse } from '~/users/models/services/generated/user.generated';
import { buttonWrapper, root, textWrapper, userWrapper, usersCount, wrapper } from './no-access-users.css';
import { Button, Icon, Spinner, Typography } from '@djeka07/ui';

type NoAccessUsersProps = {
  usersNoAccess?: Promise<UsersResponse>;
};

const NoAccessUsers = ({ usersNoAccess }: NoAccessUsersProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={root}>
      <div className={wrapper}>
        <Icon color="heading" size="xxlarge" name="Users" />
      </div>
      <div className={userWrapper}>
        <Suspense fallback={<Spinner margin="no" size="small" color="main" />}>
          <Await resolve={usersNoAccess}>{(users) => <span className={usersCount}>{users?.total || 0}</span>}</Await>
        </Suspense>
        <Typography variant="h3">{t('users:users-view:users')}</Typography>
      </div>
      <div className={textWrapper}>
        <Typography marginTop="small" size="small" align="center" fontStyle="italic" variant="body">
          <Suspense fallback={<Skeleton height="20px" amount={1} />}>
            <Await resolve={usersNoAccess}>
              {(users) => t('users:users-view:waiting-text', { total: `${users?.total || 0}` })}
            </Await>
          </Suspense>
        </Typography>
      </div>
      <div className={buttonWrapper}>
        <Suspense fallback={<Button disabled>{t('users:users-view:give-access')}</Button>}>
          <Await resolve={usersNoAccess}>
            {(users) => (
              <Button disabled={(users?.total || 0) === 0} onClick={() => navigate('/users/access')}>
                {t('users:users-view:give-access')}
              </Button>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default NoAccessUsers;

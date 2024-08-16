import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Error, Skeleton } from '~/app/components/lists';
import { FetchState } from '~/app/models/types/fetch.state';
import { SessionInformation } from '~/app/models/types/user.session';
import { AdminContainer } from '~/auth/components/admins';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { CreateUserFormContainer } from '../create-user-form';
import { Users } from './components/users';
import { UsersSideList } from './components/users/users';
import { headingWrapper, panelContent, svg } from './user-side-list.css';
import { sortBy } from '@djeka07/utils';
import { Button, Icon, Typography, PanelContainer, PanelContent, PanelSize } from '@djeka07/ui';

type UserListProps = {
  loggedInUsers: SessionInformation[];
  selectedUserId?: string;
  state: FetchState;
  users: UserResponse[];
  total: number;
};

const UserSideList = ({ state, loggedInUsers, users, selectedUserId, total }: UserListProps) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const memoedUsers = useMemo(
    () =>
      sortBy<UsersSideList>(
        (users || []).map((u) => {
          const loggedInUser = loggedInUsers?.find((l) => l.user?.userId === u.id);
          return {
            ...u,
            ...(loggedInUser || { online: false }),
          };
        }),
        'online',
      ),
    [users, loggedInUsers],
  );

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const onCreateUserSuccess = (closePanel: () => void): void => {
    setTimeout(() => {
      closePanel();
    }, 500);
  };
  return (
    <>
      <div className={headingWrapper}>
        <Typography transform="capitalize" variant="span" size="normal">
          {t('users:users-view:users')}
        </Typography>
        <AdminContainer>
          <Button onClick={toggleShow} size="xsmall">
            <Icon className={svg} name="Plus" />
          </Button>
          {show && (
            <PanelContainer
              panelElementProps={{ maxWidth: PanelSize.Xsmall, closeOnEscape: true, showCloseButton: true }}
              afterPanelClosed={() => {
                setShow(false);
              }}
            >
              {(props) => (
                <PanelContent className={panelContent}>
                  <CreateUserFormContainer
                    onCancel={() => props.closePanel()}
                    onSuccess={() => onCreateUserSuccess(props.closePanel)}
                  />
                </PanelContent>
              )}
            </PanelContainer>
          )}
        </AdminContainer>
      </div>
      {state === 'pending' && <Skeleton amount={10} />}
      {state === 'errored' && <Error message="Could not fetch users" />}
      {memoedUsers.length > 0 && <Users selectedUserId={selectedUserId} users={memoedUsers} total={total || 0} />}
    </>
  );
};

export default UserSideList;

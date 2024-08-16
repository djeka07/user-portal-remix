import { SessionInformation } from '~/app/models/types/user.session';
import { UserResponse } from '~/users/models/services/generated/user.generated';

import { UserBadge } from '~/app/components/badges';
import Link from '~/app/components/links/link';
import { icon, name, numberOfUsers, userItem, users } from './users.css';
import { useTranslation } from 'react-i18next';
import { For, Icon } from '@djeka07/ui';

export interface UsersSideList extends UserResponse, SessionInformation {}

type UsersProps = {
  users: UsersSideList[];
  selectedUserId?: string;
  total: number;
};

const Users = (props: UsersProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={users}>
        <For each={props.users} keyed={(user) => user.id}>
          {(user) => (
            <Link
              href={`/users/${user.id}`}
              className={userItem({
                selected: props.selectedUserId === user.id,
                online: user.online,
              })}
            >
              <UserBadge user={user} />
              <span className={name}>{user.firstName}</span> <span className={name}>{user.lastName}</span>
              {!user.hasGrantedAccess && <Icon className={icon} name="Slash" color="menu" />}
            </Link>
          )}
        </For>
      </div>
      <div className={numberOfUsers}>{t('users:users-list:number-of-users', { total: props.total })}</div>
    </>
  );
};

export default Users;

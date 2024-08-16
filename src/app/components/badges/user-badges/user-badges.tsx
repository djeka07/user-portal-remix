import { badge, badgeWrapper } from './user-badges.css';

import UserBadge from '../user-badge/user-badge';
import { css } from '@djeka07/utils';
import { For } from '@djeka07/ui';

type UserBadgesProps = {
  items: { firstName: string; lastName: string }[];
  className?: string;
};

const UserBadges = ({ items, className }: UserBadgesProps) => (
  <span className={css(className, badgeWrapper)}>
    <For each={items} keyed={(user) => `${user.firstName}-${user.lastName}`}>
      {(user, index) => (
        <UserBadge className={badge({ isMultiple: items?.length > 1, isSecond: index >= 1 })} user={user} />
      )}
    </For>
  </span>
);

export default UserBadges;

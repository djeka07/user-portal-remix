import { css } from '@djeka07/utils';
import { root, toolTip, wrapper, WrapperStyleVariants } from './user-badge.css';

type UserBadgeProps = WrapperStyleVariants & {
  user: { firstName: string; lastName: string };
  className?: string;
  text?: string;
};

const UserBadge = ({ user, className, size = 'normal', text }: UserBadgeProps) => (
  <span className={root}>
    <span className={css(wrapper({ size }), className)}>
      <span>{user?.firstName?.[0]}</span>
      <span>{user?.lastName?.[0]}</span>
    </span>
    {!!text && <span className={toolTip}>{text}</span>}
  </span>
);

export default UserBadge;

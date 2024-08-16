import { useTranslation } from 'react-i18next';
import Link from '~/app/components/links/link';
import { UserResponse } from '~/users/models/services/generated/user.generated';
import { Form } from '../forms';
import ThemeContainer from '../themes/theme.container';
import {
  hideLiInMobile,
  icon,
  item,
  li,
  list,
  logoutButton,
  navigation,
  root,
  themeLi,
  truncated,
} from './navigation.css';
import { Icon, Typography } from '@djeka07/ui';

type NavigationProps = {
  currentUser: UserResponse;
  isAdmin: boolean;
};

const Navigation = ({ currentUser, isAdmin }: NavigationProps) => {
  const { t } = useTranslation();
  return (
    <header className={root}>
      <nav className={navigation}>
        <ul className={list}>
          <li className={li}>
            <Link size="small" title={t('common.menu.users')} className={item} href="/users">
              <Icon name="Users" className={icon} />
              <Typography className={truncated} color="link" size="xsmall">
                {t('menu.users')}
              </Typography>
            </Link>
          </li>
          <li className={li}>
            <Link size="small" title={t('common.menu.messages')} className={item} href="/messages">
              <Icon name="Message" className={icon} />
              <Typography className={truncated} color="link" size="xsmall">
                {t('menu.messages')}
              </Typography>
            </Link>
          </li>
          <li className={li}>
            <Link title={t('common.menu.profile')} className={item} href={`/users/${currentUser?.id}`}>
              <Icon name="User" className={icon} />
              <Typography className={truncated} color="link" size="xsmall">
                {t('menu.profile')}
              </Typography>
            </Link>
          </li>
          {isAdmin && (
            <>
              <li className={li}>
                <Link title={t('common.menu.apps')} className={item} href="/applications">
                  <Icon name="Server" className={icon} />
                  <Typography className={truncated} color="link" size="xsmall">
                    {t('menu.apps')}
                  </Typography>
                </Link>
              </li>
              <li className={hideLiInMobile}>
                <Link size="small" title={t('common.menu.settings')} className={item} href="/settings">
                  <Icon name="Settings" className={icon} />
                  <Typography className={truncated} color="link" size="xsmall">
                    {t('menu.settings')}
                  </Typography>
                </Link>
              </li>
            </>
          )}
          <li className={li}>
            <Form className={item} action={'/?index'} method="post">
              <button className={logoutButton} name="logout" type="submit">
                <Icon name="Logout" className={icon} />
                <Typography className={truncated} color="link" size="xsmall">
                  {t('menu.logout')}
                </Typography>
              </button>
            </Form>
          </li>
          <li className={themeLi}>
            <ThemeContainer size="normal" />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;

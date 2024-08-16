import { Outlet } from '@remix-run/react';
import AsideLayout from '~/app/components/layouts/aside-layout';
import { UserSideListContainer } from '~/users/components/user-side-list';
import { UsersProvider } from '~/users/models/contexts/users.context';

const UserLayout = () => (
  <UsersProvider>
    <AsideLayout margin="small" asideRender={<UserSideListContainer />}>
      <Outlet />
    </AsideLayout>
  </UsersProvider>
);

export default UserLayout;

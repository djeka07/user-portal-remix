import { AuthProvider } from '~/auth/models/contexts/auth.context';
// import { NotificationsContainer } from '~/notifications/components/notifications';
import { UserResponse, RoleResponse } from '~/users/models/services/generated/user.generated';

import { main } from './auth-layout.css';
import { Authorization } from '~/app/models/helpers/token';
import { ReactNode } from 'react';
import { Navigation } from '../../../app/components/navigation';
import isAdministrator from '~/auth/models/helpers/is-administrator';
import { AuthRefreshContainer } from '~/auth/components/auth-refresh';
import { SocketProvider } from '~/app/models/contexts/socket.context';
import { PanelsRendererContainer } from '@djeka07/ui';

type AuthLayoutProps = {
  user: UserResponse;
  token: Authorization;
  roles: RoleResponse[];
  children: ReactNode;
};

const AuthLayout = ({ children, roles, token, user }: AuthLayoutProps) => (
  <AuthProvider initialUser={user} initialToken={token} initialRoles={roles}>
    {import.meta.env.VITE_AUTH_REFRESH_ACTIVE === 'true' && <AuthRefreshContainer />}
    <Navigation currentUser={user} isAdmin={isAdministrator(user, roles)} />
    <SocketProvider user={user} token={token}>
      <>
        {/* <NotificationsContainer /> */}
        <main className={main}>{children}</main>
        <PanelsRendererContainer />
      </>
    </SocketProvider>
  </AuthProvider>
);

export default AuthLayout;

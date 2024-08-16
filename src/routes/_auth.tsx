import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { AuthLayout } from '~/auth/components/layouts';
import getAuthentication from '~/auth/models/.server/get-authentication';
import { fetchRolesRequest, getSelfRequest } from '~/users/models/services/users.service';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const token = await getAuthentication(request);
    const req = { accessToken: token.accessToken };
    const [user, roles] = await Promise.all([getSelfRequest(req), fetchRolesRequest(req)]);
    return json({ token, user, roles });
  } catch (error) {
    console.log(error);
    return redirect('/login');
  }
};

const AuthLayouts = () => {
  const { roles, token, user } = useLoaderData<typeof loader>();
  return (
    <AuthLayout token={token} roles={roles} user={user}>
      <Outlet />
    </AuthLayout>
  );
};

export default AuthLayouts;

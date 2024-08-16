import { ActionFunctionArgs, defer, json, LoaderFunctionArgs } from '@remix-run/node';
import { FailResponse } from '~/app/models/types/action';
import getAuthentication from '~/auth/models/.server/get-authentication';
import createUser from '~/users/models/actions/create-user';
import { UserActionIntent } from '~/users/models/enums/intents';
import { UsersView } from '~/users/views';
import { loader as authLoader } from './_auth';
import isAdministrator from '~/auth/models/helpers/is-administrator';
import { fetchUsersRequest } from '~/users/models/services/users.service';
import { useLoaderData } from '@remix-run/react';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { accessToken } = await getAuthentication(request);
  if (formData.get('intent') === UserActionIntent.CREATE) {
    return createUser(accessToken, formData);
  }

  return json(new FailResponse(), 404);
};

export const loader = async (args: LoaderFunctionArgs) => {
  const auth = await authLoader(args);
  const { roles, user, token } = await auth.json();
  const isAdmin = isAdministrator(user, roles);
  if (isAdmin) {
    const response = fetchUsersRequest({
      page: 1,
      take: 1,
      filter: { hasGrantedAccess: false },
      accessToken: token?.accessToken,
    });

    return defer({ response });
  }
  return null;
};

const UsersRoute = () => {
  const data = useLoaderData<typeof loader>();

  return <UsersView usersNoAccess={data?.response} />;
};

export default UsersRoute;

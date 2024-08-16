import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, defer } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import i18nServer from '~/app/models/server/i18n.server';
import getAuthentication from '~/auth/models/.server/get-authentication';
import updateUserAccess from '~/users/models/actions/update-user-access';
import { fetchApplicationsRequest, fetchUsersRequest } from '~/users/models/services/users.service';
import { UsersAccessView } from '~/users/views';

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const token = await getAuthentication(request);
  return updateUserAccess(token.accessToken, form);
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const token = await getAuthentication(request);

  const applications = fetchApplicationsRequest({ accessToken: token?.accessToken, page: 1, take: 20 });
  const t = await i18nServer.getFixedT(request);
  const users = fetchUsersRequest({
    accessToken: token?.accessToken,
    page: 1,
    take: 100,
    filter: { hasGrantedAccess: false },
  });
  return defer({ applications, users, title: t('users:access:title') });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    {
      property: 'og:title',
      content: data?.title,
    },
    {
      name: 'description',
    },
  ];
};

const UsersAccessRoute = () => {
  const data = useLoaderData<typeof loader>();
  return <UsersAccessView applications={data.applications} users={data.users} />;
};

export default UsersAccessRoute;

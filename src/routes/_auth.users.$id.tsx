import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, defer, json } from '@remix-run/node';
import { Await, useLoaderData, useParams } from '@remix-run/react';
import { Suspense } from 'react';
import { FailResponse } from '~/app/models/types/action';
import { authenticator } from '~/auth/models/.server/auth';
import getAuthentication from '~/auth/models/.server/get-authentication';
import editUser from '~/users/models/actions/edit-user';
import resetUserPassword from '~/users/models/actions/reset-user-password';
import updateUserPassword from '~/users/models/actions/update-user-password';
import { UserActionIntent } from '~/users/models/enums/intents';
import { fetchUserByIdRequest } from '~/users/models/services/users.service';
import { UserView } from '~/users/views';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.response?.firstName} ${data?.response?.lastName}` },
    {
      property: 'og:title',
      content: `${data?.response?.firstName} ${data?.response?.lastName}`,
    },
    {
      name: 'description',
    },
  ];
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { accessToken } = await getAuthentication(request);
  const intent = formData.get('intent');
  switch (intent) {
    case UserActionIntent.EDIT:
      return editUser(accessToken, formData);
    case UserActionIntent.RESET:
      return resetUserPassword(params.id!, accessToken);
    case UserActionIntent.EDIT_PASSWORD:
      return updateUserPassword(accessToken, formData);

    default:
      return json(new FailResponse(), 404);
  }
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const token = await authenticator.isAuthenticated(request);
  const response = await fetchUserByIdRequest({ id: params.id!, accessToken: token?.accessToken });
  return defer({ response });
};

const UserRoute = () => {
  const data = useLoaderData<typeof loader>();
  const params = useParams();
  return (
    <Suspense key={params.id} fallback={<div>Loading...</div>}>
      <Await resolve={data.response} errorElement={<div>Error</div>}>
        {(user) => <UserView id={params.id as string} user={user} />}
      </Await>
    </Suspense>
  );
};

export default UserRoute;

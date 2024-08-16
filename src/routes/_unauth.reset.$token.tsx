import { LoaderFunctionArgs, redirect, ActionFunctionArgs, json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import newPassword from '~/auth/models/actions/new-password';
import { NewPasswordView } from '~/auth/views';
import { verifyResetToken } from '~/users/models/services/users.service';

export const action = async ({ request, context, params }: ActionFunctionArgs) => {
  const form = await request.formData();
  return newPassword(params.token!, form);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const response = await verifyResetToken({ token: params.token! });
    return json(response);
  } catch (error) {
    return redirect('/reset?reason=token_not_valid');
  }
};

const NewPasswordRoute = () => {
  const params = useParams();
  const data = useLoaderData<typeof loader>();
  return <NewPasswordView resetToken={params.token!} email={data.email} />;
};

export default NewPasswordRoute;

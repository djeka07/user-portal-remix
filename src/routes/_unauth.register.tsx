import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { validateSchema } from '~/app/models/helpers/schema';
import i18nServer from '~/app/models/server/i18n.server';
import { FailResponse, SuccessResponse } from '~/app/models/types/action';
import registerFormSchema from '~/auth/components/register-forms/register-form.schema';
import { RegisterView } from '~/auth/views';
import { registerRequest } from '~/users/models/services/users.service';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    {
      property: 'og:title',
      content: data?.title,
    },
    {
      name: 'description',
      content: data?.description,
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await i18nServer.getFixedT(request);
  return {
    title: t('form:register:title'),
    description: t('form:register:description'),
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const firstName = String(formData.get('firstName'));
    const lastName = String(formData.get('lastName'));
    const password = String(formData.get('password'));
    const confirmPassword = String(formData.get('confirmPassword'));
    const { isValid, formErrors } = validateSchema(registerFormSchema, {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    });
    if (!isValid) {
      return json(new FailResponse(formErrors), 400);
    }
    await registerRequest({ email, firstName, lastName, password, confirmPassword });
    return json(new SuccessResponse());
  } catch (error) {
    return json(new FailResponse(error), 500);
  }
};

const RegisterRoute = () => <RegisterView />;

export default RegisterRoute;

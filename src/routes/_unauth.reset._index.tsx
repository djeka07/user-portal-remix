import { LoaderFunctionArgs, MetaFunction, ActionFunctionArgs, json } from '@remix-run/node';
import { useLocation, useParams, useSearchParams } from '@remix-run/react';
import { validateSchema } from '~/app/models/helpers/schema';
import i18nServer from '~/app/models/server/i18n.server';
import { FailResponse, SuccessResponse } from '~/app/models/types/action';
import resetFormSchema from '~/auth/components/reset-forms/reset-form.schema';
import { ResetView } from '~/auth/views';
import { resetByEmailRequest } from '~/users/models/services/users.service';

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
    title: t('form:reset:title'),
    description: t('form:reset:description'),
  };
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const { isValid, formErrors } = validateSchema(resetFormSchema, { email });
    if (!isValid) {
      return json(new FailResponse(formErrors), 400);
    }
    await resetByEmailRequest({ email });
    return json(new SuccessResponse());
  } catch (error) {
    return json(new SuccessResponse());
  }
};

const ResetRoute = () => <ResetView />;

export default ResetRoute;

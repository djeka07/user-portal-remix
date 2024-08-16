import { json } from '@remix-run/node';
import { validateSchema } from '~/app/models/helpers/schema';
import { ActionResponse, FailResponse, SuccessResponse } from '~/app/models/types/action';
import newPasswordSchema from '~/auth/components/new-password-forms/new-password.schema';
import { ApiException, OkResponse } from '~/users/models/services/generated/user.generated';
import { updatePasswordFromTokenRequest } from '~/users/models/services/users.service';

export default async (token: string, form: FormData): Promise<ActionResponse<OkResponse, ApiException>> => {
  try {
    const password = String(form.get('password'));
    const confirmPassword = String(form.get('confirmPassword'));
    const { isValid, formErrors } = validateSchema(newPasswordSchema, { password, confirmPassword });
    if (!isValid) {
      return json(new FailResponse(formErrors), 400);
    }
    const response = await updatePasswordFromTokenRequest({ token, confirmPassword, password });
    return json(new SuccessResponse(response));
  } catch (error) {
    return json(new FailResponse(error), (error as ApiException)?.status || 500);
  }
};

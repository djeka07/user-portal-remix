import { json } from '@remix-run/node';
import { ActionResponse, FailResponse, SuccessResponse } from '~/app/models/types/action';
import { ApiException, OkResponse } from '../services/generated/user.generated';
import { resetByIdRequest, updatePasswordFromAccessToken } from '../services/users.service';

export default async (accessToken: string, form: FormData): Promise<ActionResponse<OkResponse, ApiException>> => {
  try {
    const currentPassword = String(form.get('currentPassword'));
    const password = String(form.get('password'));
    const confirmPassword = String(form.get('confirmPassword'));
    const reset = await updatePasswordFromAccessToken({ accessToken, currentPassword, confirmPassword, password });
    return json(new SuccessResponse(reset));
  } catch (error) {
    return json(new FailResponse(error), (error as ApiException).status);
  }
};

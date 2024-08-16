import { json } from '@remix-run/node';
import { ActionResponse, FailResponse, SuccessResponse } from '~/app/models/types/action';
import { ApiException, OkResponse } from '../services/generated/user.generated';
import { resetByIdRequest } from '../services/users.service';

export default async (id: string, accessToken: string): Promise<ActionResponse<OkResponse, ApiException>> => {
  try {
    const reset = await resetByIdRequest({ id, accessToken });
    return json(new SuccessResponse(reset));
  } catch (error) {
    return json(new FailResponse(error), (error as ApiException).status);
  }
};

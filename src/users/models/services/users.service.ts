import createHeaders from '~/app/models/helpers/headers';
import {} from './generated/user.generated';
import {
  AppControllerClient,
  AuthClient,
  AuthControllerClient,
  GetApplicationsResponse,
  OkResponse,
  RegisterRequest,
  RoleControllerClient,
  RoleResponse,
  SelfControllerClient,
  Token,
  UpdateUsersAccessRequest as UpdateUsersAccessReq,
  UserControllerClient,
  UserRequest,
  UserResponse,
  UsersResponse,
  VerifyPasswordTokenResponse,
  UpdateSelfPasswordRequest,
} from './generated/user.generated';
import { http } from '@djeka07/utils';

const url = import.meta.env.VITE_USER_API;
const applicationId = import.meta.env.VITE_APPLICATION_ID;

export type LoginRequestModel = {
  username: string;
};

type RefreshRequest = {
  token: string;
};

export type UpdatePasswordFromTokenRequest = RefreshRequest & {
  password: string;
  confirmPassword: string;
};

export type ResetByEmailRequest = {
  email: string;
};

export type ResetByIdRequest = GetSelfRequest & {
  id: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type GetSelfRequest = {
  accessToken?: string;
};

export type CreateUserRequest = GetSelfRequest & {
  form: UserRequest;
};

export type UpdateUserRequest = GetSelfRequest & {
  id: string;
  form: UserRequest;
};

export type UpdateUsersAccessRequest = GetSelfRequest & {
  form: UpdateUsersAccessReq;
};

export type FetchUserByIdRequest = GetSelfRequest & {
  id: string;
};

export type FetchUsersRequest = GetSelfRequest & {
  page: number;
  take: number;
  filter?: { hasGrantedAccess?: boolean; roleIds?: string[] };
};

export type SearchUsersRequest = GetSelfRequest & {
  page: number;
  take: number;
  query?: string;
};

export type FetchApplicationsRequestParams = GetSelfRequest & {
  page: number;
  take: number;
};

export type UpdatePasswordFromAccessTokenRequest = GetSelfRequest & UpdateSelfPasswordRequest;

export const loginRequest = ({ email, password }: LoginBody): Promise<Token> => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url, headers), url, http());
  return client.auth({ email, password, applicationId });
};

export const refreshRequest = ({ token }: RefreshRequest): Promise<Token> => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url, headers), url, http());
  return client.refresh(token);
};

export const registerRequest = (request: RegisterRequest): Promise<OkResponse> => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url, headers), url, http());
  return client.register(request);
};

export const resetByEmailRequest = ({ email }: ResetByEmailRequest): Promise<OkResponse> => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url, headers), url, http());
  return client.resetPasswordToken({ email, applicationId });
};

export const verifyResetToken = ({ token }: RefreshRequest): Promise<VerifyPasswordTokenResponse> => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url, headers), url, http());
  return client.verifyResetToken(token);
};

export const resetByIdRequest = ({ id, accessToken }: ResetByIdRequest): Promise<OkResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.resetPasswordToken(id, { applicationId });
};

export const updatePasswordFromAccessToken = ({ accessToken, ...rest }: UpdatePasswordFromAccessTokenRequest) => {
  const headers = createHeaders({ accessToken });
  const client = new SelfControllerClient(new AuthClient(url, headers), url, http());
  return client.updatePassword(rest);
};

export const getSelfRequest = async ({ accessToken }: GetSelfRequest): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new SelfControllerClient(new AuthClient(url, headers), url, http());
  return client.get();
};

export const fetchUsersRequest = async ({
  accessToken,
  page,
  take,
  filter,
}: FetchUsersRequest): Promise<UsersResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.getUsers(false, JSON.stringify(filter), page, take);
};

export const searchUsersRequest = async ({
  accessToken,
  page,
  take,
  query,
}: SearchUsersRequest): Promise<UsersResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.searchUsers(query, page, take);
};

export const createUserRequest = async ({ accessToken, form }: CreateUserRequest): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.createUser(form);
};

export const updateUserRequest = async ({ accessToken, form, id }: UpdateUserRequest): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.updateUser(id, form);
};

export const updateUsersAccessRequest = async ({
  accessToken,
  form,
}: UpdateUsersAccessRequest): Promise<UserResponse[]> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.grantAccessForUsers(form);
};

export const fetchUserByIdRequest = async ({ accessToken, id }: FetchUserByIdRequest): Promise<UserResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new UserControllerClient(new AuthClient(url, headers), url, http());
  return client.findUserById(id);
};

export const fetchRolesRequest = async ({ accessToken }: GetSelfRequest): Promise<RoleResponse[]> => {
  const headers = createHeaders({ accessToken });
  const client = new RoleControllerClient(new AuthClient(url, headers), url, http());
  return client.getRoles();
};

export const updatePasswordFromTokenRequest = async ({
  token,
  confirmPassword,
  password,
}: UpdatePasswordFromTokenRequest): Promise<OkResponse> => {
  const headers = createHeaders();
  const client = new AuthControllerClient(new AuthClient(url, headers), url, http());
  return client.updatePasswordFromResetToken(token, { password, confirmPassword });
};

export const fetchApplicationsRequest = async ({
  accessToken,
  page,
  take,
}: FetchApplicationsRequestParams): Promise<GetApplicationsResponse> => {
  const headers = createHeaders({ accessToken });
  const client = new AppControllerClient(new AuthClient(url, headers), url, http());
  return client.get(page, take);
};

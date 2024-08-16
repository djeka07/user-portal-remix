import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';
import { UserResponse, UsersResponse } from '../services/generated/user.generated';
import { FetchState } from '~/app/models/types/fetch.state';

export type UsersState = {
  users: UserResponse[];
  total: number;
  hasNextPage: boolean;
  page: number;
  state: FetchState;
};

type UsersContext = [UsersState, Dispatch<SetStateAction<UsersState>>];

const defaultContext: UsersContext = [
  {
    hasNextPage: false,
    page: 0,
    total: 0,
    users: [],
    state: 'pending',
  },
  function () {
    throw new Error('not implemented');
  },
];

type UsersContextProps = PropsWithChildren<{
  initialState?: UsersResponse;
}>;

export const UsersContext = createContext<UsersContext>(defaultContext);

export const UsersProvider = ({ initialState, children }: UsersContextProps) => {
  const state = useState<UsersState>({ ...(initialState || defaultContext[0]), state: 'pending' });
  return <UsersContext.Provider value={state}>{children}</UsersContext.Provider>;
};

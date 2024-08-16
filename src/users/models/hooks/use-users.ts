import { useCallback, useContext, useMemo } from 'react';
import { UserResponse } from '../services/generated/user.generated';
import { UsersContext, UsersState } from '../contexts/users.context';
import { isEmpty } from '~/app/models/helpers/object';
import { useFetcher } from 'react-router-dom';
import { fetchUsersRequest } from '../services/users.service';
import { useAuth } from '~/auth/models/hooks/use-auth';

type UseUsersActions = {
  fetch: (filter?: { hasGrantedAccess?: boolean; roleIds?: string[] }) => void;
};

type UseReturnUsersReturn = [UsersState, UseUsersActions];

const useUsers = (): UseReturnUsersReturn => {
  const [{ token }] = useAuth();
  const [{ hasNextPage, page, total, users: stateUsers, state }, setState] = useContext(UsersContext);
  const fetcher = useFetcher();

  const fetch = useCallback(
    async (filter?: { hasGrantedAccess?: boolean; roleIds?: string[] }) => {
      try {
        setState((prev) => ({ ...prev, state: 'pending' }));
        const response = await fetchUsersRequest({ accessToken: token?.accessToken, page: page + 1, take: 20, filter });
        setState((prev) => ({ ...prev, state: 'ready', ...response }));
      } catch (error) {
        setState((prev) => ({ ...prev, state: 'errored' }));
      }
    },
    [page],
  );

  return [
    {
      users: stateUsers,
      page,
      hasNextPage,
      total,
      state,
    },
    { fetch },
  ];
};

export default useUsers;

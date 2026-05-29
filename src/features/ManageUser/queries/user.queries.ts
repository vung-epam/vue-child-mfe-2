import { useMutation, useQueryClient } from '@tanstack/vue-query';
import {
  createUser,
  createUsersBulk,
  fetchUserById,
  fetchUsers,
  type CreateUserPayload,
  type CreateUsersBulkPayload,
  type UserDetail,
  type UserListResponse,
} from '../../../shared/api/user.api';
import { createResourceQueries } from '../../../shared/queries/createResourceQueries';

const USERS_KEY = 'users';

const userQueries = createResourceQueries<
  UserDetail,
  UserListResponse,
  CreateUserPayload
>({
  key: USERS_KEY,
  fetchList: fetchUsers,
  fetchById: fetchUserById,
  create: createUser,
});

export const useUsers = userQueries.useList;
export const useUserDetail = userQueries.useDetail;
export const useCreateUser = userQueries.useCreate;

export const useCreateUsersBulk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUsersBulkPayload) => createUsersBulk(payload),
    onSuccess: (newItems) => {
      queryClient.setQueryData(
        [USERS_KEY, 'list'],
        (oldData: UserListResponse | undefined) => {
          if (!oldData) {
            return {
              [USERS_KEY]: newItems,
              total: newItems.length,
              skip: 0,
              limit: 10,
            } as UserListResponse;
          }

          const prevItems = Array.isArray(oldData[USERS_KEY])
            ? (oldData[USERS_KEY] as UserDetail[])
            : [];

          return {
            ...oldData,
            [USERS_KEY]: [...newItems, ...prevItems],
            total: oldData.total + newItems.length,
          } as UserListResponse;
        },
      );
    },
  });
};

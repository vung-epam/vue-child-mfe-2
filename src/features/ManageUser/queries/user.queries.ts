import { createUser, fetchUserById, fetchUsers, type CreateUserPayload, type UserDetail, type UserListResponse } from '../../../shared/api/user.api';
import { createResourceQueries } from '../../../shared/queries/createResourceQueries';

const userQueries = createResourceQueries<UserDetail, UserListResponse, CreateUserPayload>({
  key: "users",
  fetchList: fetchUsers,
  fetchById: fetchUserById,
  create: createUser,
});

export const useUsers = userQueries.useList;
export const useUserDetail = userQueries.useDetail;
export const useCreateUser = userQueries.useCreate;

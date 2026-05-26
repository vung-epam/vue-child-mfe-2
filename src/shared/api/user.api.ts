import type { ListResponse } from '../queries/createResourceQueries';
import { apiClient } from './client';

export interface UserDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  company: {
    name: string;
    department: string;
    title: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

export interface UserListResponse extends ListResponse<UserDetail> { }

export const fetchUsers = async (): Promise<UserListResponse> => {
  const { data } = await apiClient.get<UserListResponse>('/users');
  return data;
};


export const fetchUserById = async (id: number): Promise<UserDetail> => {
  const { data } = await apiClient.get<UserDetail>(`/users/${id}`);
  return data;
};

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

export const createUser = async (payload: CreateUserPayload): Promise<UserDetail> => {
  const { data } = await apiClient.post<UserDetail>('/users/add', payload);
  return data;
};

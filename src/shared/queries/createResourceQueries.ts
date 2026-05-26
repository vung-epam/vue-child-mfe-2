import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';

export interface ListResponse<TItem> {
  total: number;
  skip: number;
  limit: number;
  [key: string]: TItem[] | number;
}

export interface CreateResourceQueriesOptions<
  TItem,
  TList extends ListResponse<TItem>,
  TPayload,
> {
  key: string,
  fetchList: () => Promise<TList>;
  fetchById: (id: number) => Promise<TItem>;
  create: (payload: TPayload) => Promise<TItem>;
}

export function createResourceQueries<
  TItem,
  TList extends ListResponse<TItem>,
  TPayload,
>(options: CreateResourceQueriesOptions<TItem, TList, TPayload>) {
  const { key, fetchList, fetchById, create } = options;

  const useList = () => {
    return useQuery({
      queryKey: [key, "list"],
      queryFn: () => fetchList(),
    });
  };

  const useDetail = (id: Ref<number>) => {
    return useQuery({
      queryKey: [key, id.value],
      queryFn: () => fetchById(id.value),
    });
  };

  const useCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (payload: TPayload) => create(payload),
      onSuccess: (newItem) => {
        queryClient.setQueryData([key, 'list'], (oldData: TList | undefined) => {
          if (!oldData) {
            return {
              [key]: [newItem],
              total: 1,
              skip: 0,
              limit: 10,
            } as unknown as TList;
          }

          const prevItems = oldData[key] as TItem[];

          return {
            ...oldData,
            [key]: [newItem, ...prevItems],
            total: oldData.total + 1,
          } as TList;
        });
      },
    });
  };

  return { useList, useDetail, useCreate };
}

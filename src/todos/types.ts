export interface CreateTodoOptions {
  ownerid: string;
  title: string;
}

export interface GetTodoListOptions {
  ownerid: string;
  page?: number;
  limit?: number;
  isDone?: boolean;
  search?: string;
}

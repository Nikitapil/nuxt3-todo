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

export interface EditTodoOptions {
  id: string;
  ownerid: string;
  title?: string;
  isDone?: boolean;
}

export interface DeleteTodoOptions {
  id: string;
  ownerid: string;
}

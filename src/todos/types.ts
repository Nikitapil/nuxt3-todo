export interface CreateTodoOptions {
  ownerid: string;
  title: string;
  category?: string;
}

export interface GetTodoListOptions {
  ownerid: string;
  page?: number;
  limit?: number;
  isDone?: boolean;
  search?: string;
  category?: string;
}

export interface EditTodoOptions {
  id: string;
  ownerid: string;
  title?: string;
  done?: boolean;
}

export interface DeleteTodoOptions {
  id: string;
  ownerid: string;
}

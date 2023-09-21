export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFilter {
  page: number;
  limit: number;
  isDone?: boolean;
  search: string;
}

export interface TodoState {
  items: Todo[];
  isLoading: boolean;
  todoFilter: TodoFilter;
  totalCount: number;
}

export interface TodoAdd {
  title: string;
}

export interface TodoUpdate {
  title?: string;
  done?: boolean;
}

export type TodoCompletionStatus = 'completed' | 'uncompleted' | 'all';

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  category: string | null;
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
  categories: string[];
}

export interface TodoAdd {
  title: string;
  category: string;
}

export interface TodoUpdate {
  title?: string;
  done?: boolean;
}

export type TodoCompletionStatus = 'completed' | 'uncompleted' | 'all';

export interface AppSelectOptions {
  name: string;
  value: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

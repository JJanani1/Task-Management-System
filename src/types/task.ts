export type Priority =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export type Status =
  | "Todo"
  | "In Progress"
  | "Review"
  | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: Priority;
  status: Status;
  startDate: string;
  dueDate: string;
  createdAt: string;
}
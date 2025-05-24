import { v4 as uuidv4 } from "uuid";

export const TaskStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const TaskPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

export class Task {
  constructor(title, description, status, priority, dueDate) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.dueDate = new Date(dueDate);
    this.priority = priority;
  }
}

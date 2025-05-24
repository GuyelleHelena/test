export const TaskStatus = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    ARCHIVED: 'archived',
} as const;
export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export const TaskPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
} as const;
export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];

export interface CustomResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export class Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        title: string,
        description: string,
        status: TaskStatus,
        priority: TaskPriority,
        dueDate: Date,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}

export function getEmptyTask(): Task {
    return new Task(
        0,
        '',
        '',
        TaskStatus.PENDING,
        TaskPriority.LOW,
        new Date(),
        new Date(),
        new Date()
    );
}
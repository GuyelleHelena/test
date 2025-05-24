import type { CustomResponse, Task } from "../classes/Task";

const token = localStorage.getItem('token') || 'my_secret_api_key';

export async function addTask(task: { title: string; description: string, }): Promise<CustomResponse<Task>> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        return {
            success: false,
            message: 'Failed to add task',
        }
    } else {
        const data: Task = await response.json();
        return {
            success: true,
            message: 'Task added successfully',
            data: data,
        };
    }
}

export async function getTasks(): Promise<CustomResponse<Task[]>> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        return {
            success: false,
            message: 'Failed to fetch tasks',
        }
    } else {
        const data = await response.json();
        return {
            success: true,
            message: 'Tasks fetched successfully',
            data: data,
        };
    }
}

export async function deleteTask(id: string): Promise<CustomResponse<void>> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        return {
            success: false,
            message: 'Failed to delete task',
        }
    } else {
        return {
            success: true,
            message: 'Task deleted successfully',
        };
    }

}

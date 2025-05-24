import { useState } from "react";
import { getEmptyTask, Task } from "../../classes/Task";
import { addTask } from "../../controllers/TaskController";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Select,
  TextArea,
  TextInput,
} from "grommet";

export default function TaskForm({
  setShowModalForm,
  setRefresh,
  setShowAddSuccessNotification,
}: {
  setShowModalForm: (show: boolean) => void;
  setRefresh: (refresh: boolean) => void;
  setShowAddSuccessNotification: (show: boolean) => void;
}) {
  const [task, setTask] = useState<Task>(getEmptyTask());
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addTask(task);
    setRefresh(true);
    setLoading(false);
    setShowModalForm(false);
    setShowAddSuccessNotification(true);
  };

  return (
    <>
      <Box
        width="medium"
        pad="medium"
        background="light-1"
        round="small"
        gap="medium"
      >
        <Heading level={3} margin="none" textAlign="center">
          Create New Task
        </Heading>
        <Form onSubmit={handleSubmit} value={task}>
          <FormField label="Title" name="title" required>
            <TextInput
              name="title"
              placeholder="Enter task title"
              value={task.title || ""}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Description" name="description" required>
            <TextArea
              name="description"
              placeholder="Enter task description"
              value={task.description || ""}
              onChange={handleChange}
            />
          </FormField>

          <FormField label="Priority" name="priority" required>
            <Select
              name="priority"
              options={["low", "medium", "high", "urgent"]}
              value={task.priority || ""}
              onChange={({ option }) =>
                setTask((prevTask) => ({ ...prevTask, priority: option }))
              }
              placeholder="Select priority level"
            />
          </FormField>

          <FormField
            label="Due Date"
            name="dueDate"
            required
            validate={[
              {},
              (value) => {
                const today = new Date();
                const selectedDate = new Date(value);
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                  return "Due date cannot be in the past";
                }

                return undefined;
              },
            ]}
          >
            <TextInput
              type="date"
              name="dueDate"
              value={
                task.dueDate
                  ? typeof task.dueDate === "string"
                    ? task.dueDate
                    : (task.dueDate as Date).toISOString().slice(0, 10)
                  : ""
              }
              onChange={handleChange}
            />
          </FormField>

          <Box
            direction="row"
            justify="between"
            gap="small"
            margin={{ top: "medium" }}
          >
            <Button
              label="Cancel"
              onClick={() => setShowModalForm(false)}
              secondary
            />
            <Button
              type="submit"
              primary
              label={loading ? "Submitting..." : "Submit Task"}
              disabled={loading}
            />
          </Box>
        </Form>
      </Box>
    </>
  );
}

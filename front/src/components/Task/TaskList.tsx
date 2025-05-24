import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "../../controllers/TaskController";
import type { Task } from "../../classes/Task";
import {
  Box,
  Button,
  DataTable,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
} from "grommet";
import AddTaskModal from "./AddTaskModal";
import Notification from "../Notification/Notification";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModalForm, setShowModalForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showDeleteSuccessNotification, setShowDeleteSuccessNotification] =
    useState(false);
  const [showAddSuccessNotification, setShowAddSuccessNotification] =
    useState(false);

  const fetchTasks = async () => {
    return await getTasks();
  };

  useEffect(() => {
    setRefresh(true);
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchTasks().then((response) => {
        setLoading(true);
        setTasks(response.data || []);
        setLoading(false);
        setRefresh(false);
      });
    }
  }, [refresh]);

  const handleDelete = async (id: string) => {
    const response = await deleteTask(id);
    if (response.success) {
      setTasks(tasks.filter((task) => task.id.toString() !== id));
      setShowDeleteSuccessNotification(true);
    } else {
      console.error("Failed to delete task:", response.message);
    }
  };

  if (loading) {
    return (
      <Box fill align="center" justify="center" pad="large">
        <Text size="large" weight="bold">
          Loading tasks...
        </Text>
      </Box>
    );
  }

  return (
    <Box pad="medium" gap="medium">
      <Box direction="row" justify="between" align="center">
        <Heading level="2" margin="none">
          Task List
        </Heading>
        <Button
          label="Create Task"
          onClick={() => setShowModalForm(true)}
          primary
        />
      </Box>

      <Card background="light-1" pad="small" round="small" elevation="small">
        <CardHeader pad={{ horizontal: "small", vertical: "small" }}>
          <Text size="medium" weight="bold">
            All Tasks
          </Text>
        </CardHeader>
        <CardBody>
          <DataTable
            data={tasks}
            columns={[
              { property: "title", header: "Title" },
              { property: "description", header: "Description" },
              { property: "status", header: "Status" },
              { property: "priority", header: "Priority" },
              {
                property: "dueDate",
                header: "Due Date",
                render: (task: Task) =>
                  new Date(task.dueDate).toLocaleDateString(),
              },
              {
                property: "actions",
                header: "Actions",
                render: (task: Task) => (
                  <Button
                    label="Delete"
                    color="status-critical"
                    onClick={() => handleDelete(task.id.toString())}
                    size="small"
                    secondary
                  />
                ),
              },
            ]}
            step={10}
            margin={{ top: "small" }}
            fill
            resizeable
            border={{ side: "horizontal" }}
          />
        </CardBody>
      </Card>

      {showModalForm && (
        <AddTaskModal
          showModal={showModalForm}
          setShowModal={setShowModalForm}
          setRefresh={setRefresh}
          setShowAddSuccessNotification={setShowAddSuccessNotification}
        />
      )}

      {showDeleteSuccessNotification && (
        <Notification
          isSuccess={true}
          message="Task successfully deleted!"
          showNotification={showDeleteSuccessNotification}
          setShowNotification={setShowDeleteSuccessNotification}
        />
      )}

      {showAddSuccessNotification && (
        <Notification
          isSuccess={true}
          message="Task successfully added!"
          showNotification={showAddSuccessNotification}
          setShowNotification={setShowAddSuccessNotification}
        />
      )}
    </Box>
  );
}

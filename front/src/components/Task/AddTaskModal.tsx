import { Grommet, Box, Button, Layer, Heading } from "grommet";
import TaskForm from "./TaskForm";

const theme = {
  global: {
    font: {
      family: "Arial",
      size: "14px",
    },
  },
};

export default function AddTaskModal({
  showModal,
  setShowModal,
  setRefresh,
  setShowAddSuccessNotification,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setRefresh: (refresh: boolean) => void;
  setShowAddSuccessNotification: (show: boolean) => void;
}) {
  const closeModal = () => setShowModal(false);

  return (
    <Grommet theme={theme} full>
      <Box fill align="center" justify="center">
        <Button label="Ouvrir le modal" onClick={() => setShowModal(true)} />

        {showModal && (
          <Layer
            onEsc={closeModal}
            onClickOutside={closeModal}
            responsive={false}
            modal
          >
            <Box pad="medium" gap="small" width="medium">
              <Heading level={3} margin="none">
                Add new task
              </Heading>
              <TaskForm
                setShowModalForm={setShowModal}
                setRefresh={setRefresh}
                setShowAddSuccessNotification={setShowAddSuccessNotification}
              />
            </Box>
          </Layer>
        )}
      </Box>
    </Grommet>
  );
}

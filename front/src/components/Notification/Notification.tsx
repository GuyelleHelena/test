import { Box, Layer, Text } from "grommet";
import { useEffect } from "react";

export default function Notification({
  isSuccess,
  message,
  showNotification,
  setShowNotification,
}: {
  isSuccess: boolean;
  message: string;
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
}) {
  useEffect(() => {
    setTimeout(() => setShowNotification(false), 5000);
  }, [setShowNotification]);

  return (
    <Box align="center" pad="large">
      {showNotification && (
        <Layer
          position="top"
          modal={false}
          margin={{ vertical: "medium", horizontal: "small" }}
          onEsc={() => setShowNotification(false)}
          responsive={false}
          plain
        >
          <Box
            background={isSuccess ? "status-ok" : "status-critical"}
            pad="medium"
            round="small"
            elevation="medium"
            animation="fadeIn"
            align="center"
          >
            <Text color="white">{message}</Text>
          </Box>
        </Layer>
      )}
    </Box>
  );
}

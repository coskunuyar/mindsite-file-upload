import React from "react";
import { Button, Grid } from "@mui/material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

interface ServerUploadProgressProps {
  uploadProgress?: number;
  cancelUpload: () => void;
}

const ServerUploadProgress: React.FC<ServerUploadProgressProps> = ({
  uploadProgress,
  cancelUpload,
}) => {
  if (!uploadProgress || uploadProgress! === 0) return <></>;

  return (
    <Grid container spacing={2} style={{ marginTop: "1rem" }}>
      <Grid item xs={8}>
        <LinearProgressWithLabel variant="determinate" value={uploadProgress} />
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={cancelUpload}
          size="small"
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default ServerUploadProgress;

import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import { CheckCircleOutlined, ReplayOutlined } from "@mui/icons-material";

interface ServerUploadSuccessMessageProps {
  message: string;
  onUploadMore: () => void;
}

const ServerUploadSuccessMessage: React.FC<ServerUploadSuccessMessageProps> = ({
  message,
  onUploadMore,
}) => {
  return (
    <Grid container spacing={2} style={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <CheckCircleOutlined color="success" style={{ fontSize: "4rem" }} />
      </Grid>
      <Grid item xs={12}>
        {message.split("\n").map((line, index) => (
          <Typography variant="subtitle1" color="text.secondary" key={index}>
            {line}
          </Typography>
        ))}{" "}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="small"
          color="success"
          onClick={onUploadMore}
          startIcon={<ReplayOutlined style={{ fontSize: "1rem" }} />}
        >
          Upload More
        </Button>
      </Grid>
    </Grid>
  );
};

export default ServerUploadSuccessMessage;

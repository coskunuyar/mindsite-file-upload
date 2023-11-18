import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import { ErrorOutlineOutlined, ReplayOutlined } from "@mui/icons-material";

interface ErrorMessageProps {
  message: string;
  onTryAgain: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onTryAgain }) => {
  return (
    <Grid container spacing={2} style={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <ErrorOutlineOutlined color="error" style={{ fontSize: "4rem" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="text.secondary">
          {message}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={onTryAgain}
          startIcon={<ReplayOutlined style={{ fontSize: "1rem" }} />}
        >
          Try Again
        </Button>
      </Grid>
    </Grid>
  );
};

export default ErrorMessage;

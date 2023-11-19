import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

interface LinearProgressWithLabelProps extends LinearProgressProps {
  value: number;
}

const LinearProgressWithLabel = (props: LinearProgressWithLabelProps) => {
  const isFinished = useMemo(() => props.value === 100, [props.value]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center" }}
      data-testid="linear-progress-with-label"
    >
      <Box sx={{ width: "100%", mr: 1 }}>
        {isFinished && <LinearProgress />}
        {!isFinished && <LinearProgress variant="determinate" {...props} />}
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;

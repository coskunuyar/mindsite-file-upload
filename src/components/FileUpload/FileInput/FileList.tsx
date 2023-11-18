import React from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { ClearOutlined, InsertDriveFileOutlined } from "@mui/icons-material";

interface FileListInputProps {
  selectedFiles: File[];
  isUploadingToServer: boolean;
  removeFile: (fileIndex: number) => void;
  browserUploadProgress: {
    [key: string]: number;
  };
}

const FileList: React.FC<FileListInputProps> = ({
  selectedFiles,
  isUploadingToServer,
  removeFile,
  browserUploadProgress,
}) => {
  if (selectedFiles.length === 0) return <></>;

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Selected Files:
      </Typography>

      <List>
        {selectedFiles.map((file, index) => (
          <ListItem key={index}>
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ marginRight: "1rem", maxHeight: "50px" }}
              />
            ) : (
              <InsertDriveFileOutlined
                style={{ margin: "0.5rem", fontSize: "2rem" }}
              />
            )}
            <ListItemText
              primary={file.name}
              secondary={`${browserUploadProgress[file.name]}%`}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeFile(index)}
              size="small"
              disabled={isUploadingToServer}
            >
              <ClearOutlined fontSize="small" />
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FileList;

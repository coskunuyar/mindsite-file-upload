import React, { ChangeEvent, useMemo } from "react";
import { Button, Grid } from "@mui/material";
import { UploadFileOutlined, SendOutlined } from "@mui/icons-material";
import FileList from "./FileList";

interface FileInputProps {
  handleUpload: () => void;
  onFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: File[];
  removeFile: (fileIndex: number) => void;
  serverUploadProgress?: number;
  browserUploadProgress: {
    [key: string]: number;
  };
}

const FileInput: React.FC<FileInputProps> = ({
  handleUpload,
  onFileInputChange,
  selectedFiles,
  removeFile,
  serverUploadProgress,
  browserUploadProgress,
}) => {
  const isUploadingToServer = useMemo(
    () => !!serverUploadProgress && serverUploadProgress >= 0,
    [serverUploadProgress]
  );
  const isUploadingToBrowser = useMemo(() => {
    return selectedFiles.some(
      (file) => browserUploadProgress[file.name] !== 100
    );
  }, [selectedFiles, browserUploadProgress]);

  return (
    <div>
      <input
        id="file-upload-input"
        data-testid="file-upload-input"
        type="file"
        multiple
        onChange={onFileInputChange}
        accept="*"
        style={{ display: "none" }}
        disabled={isUploadingToBrowser || isUploadingToServer}
      />
      <label htmlFor="file-upload-input">
        <Button
          startIcon={<UploadFileOutlined style={{ fontSize: "4rem" }} />}
          variant="outlined"
          color="primary"
          component="span"
          fullWidth
          style={{ padding: "2.5rem" }}
          disabled={isUploadingToBrowser || isUploadingToServer}
        >
          Select Files
        </Button>
      </label>

      <FileList
        selectedFiles={selectedFiles}
        isUploadingToServer={isUploadingToServer}
        removeFile={removeFile}
        browserUploadProgress={browserUploadProgress}
      />

      <Grid container spacing={2} style={{ marginTop: "1rem" }}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={handleUpload}
            size="small"
            disabled={
              !selectedFiles.length ||
              isUploadingToBrowser ||
              isUploadingToServer
            }
            startIcon={<SendOutlined />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FileInput;

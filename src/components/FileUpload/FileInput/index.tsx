import React, { ChangeEvent, useCallback, useMemo, useRef } from "react";
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
  const fileInputRef = useRef(null);

  const isUploadingToServer = useMemo(
    () => !!serverUploadProgress && serverUploadProgress >= 0,
    [serverUploadProgress]
  );
  const isUploadingToBrowser = useMemo(() => {
    return selectedFiles.some(
      (file) => browserUploadProgress[file.name] !== 100
    );
  }, [selectedFiles, browserUploadProgress]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleMouseLeave = useCallback(() => {
    const element = document.getElementById("file-upload-container");
    element?.classList.remove("hovered");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer.files;
      if (files.length > 0 && fileInputRef.current) {
        const mockEvent = {
          target: { files },
        } as ChangeEvent<HTMLInputElement>;
        onFileInputChange(mockEvent);
      }

      handleMouseLeave();
    },
    [fileInputRef, onFileInputChange, handleMouseLeave]
  );

  const handleDragEnter = useCallback(() => {
    const element = document.getElementById("file-upload-container");
    element?.classList.add("hovered");
  }, []);

  return (
    <div>
      <div
        id="file-upload-container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        draggable
      >
        <input
          id="file-upload-input"
          data-testid="file-upload-input"
          type="file"
          multiple
          onChange={onFileInputChange}
          accept="*"
          style={{ display: "none" }}
          ref={fileInputRef}
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
            sx={{ ":hover": { opacity: 0.5 } }}
            disabled={isUploadingToBrowser || isUploadingToServer}
          >
            Select Files
          </Button>
        </label>
      </div>

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

import { useState, useEffect, ChangeEvent, useCallback } from "react";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { Grid } from "@mui/material";
import FileInput from "./FileInput";
import ServerUploadProgress from "./ServerUploadProgress";
import ServerUploadSuccessMessage from "./ServerUploadSuccessMessage";
import ErrorMessage from "./ErrorMessage";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [serverUploadProgress, setServerUploadProgress] = useState<number>();
  const [serverUploadRequestRef, setServerUploadRequestRef] =
    useState<CancelTokenSource>();
  const [browserUploadProgress, setBrowserUploadProgress] = useState({});
  const [serverSuccessMessage, setServerSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setErrorMessage(undefined);
    }
  }, [selectedFiles]);

  const processFiles = useCallback((filesArray: File[]) => {
    for (const file of filesArray) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const loaded = event.loaded;
        const total = file.size;

        const progress = (loaded / total) * 100;

        setBrowserUploadProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: progress,
        }));
      };

      reader.readAsArrayBuffer(file);
    }
  }, []);

  const handleOnFail = useCallback((message: string) => {
    // setSelectedFiles([]);
    setServerUploadProgress(undefined);
    // setBrowserUploadProgress({});
    setServerSuccessMessage(undefined);
    setErrorMessage(message || "Something went wrong!");
    setServerUploadRequestRef(undefined);
  }, []);

  const handleFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const files: FileList | null = e.target.files;

        if (files) {
          const filesArray = Array.from(files);
          setSelectedFiles([...selectedFiles, ...filesArray]);

          for (const file of filesArray) {
            setBrowserUploadProgress((prevProgress) => ({
              ...prevProgress,
              [file.name]: 0,
            }));
          }

          processFiles(filesArray);
        }
      } catch (error: unknown) {
        handleOnFail((error as Error).message);
      }
    },
    [selectedFiles, processFiles, handleOnFail]
  );

  const handleRemoveFile = useCallback((fileIndex: number) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      const removedFile = updatedFiles.splice(fileIndex, 1)[0];

      setBrowserUploadProgress((prevProgress) => {
        const updatedProgress = { ...prevProgress };
        const propertyName = removedFile.name as keyof typeof prevProgress;
        delete updatedProgress[propertyName];
        return updatedProgress;
      });

      return updatedFiles;
    });
  }, []);

  const handleOnSuccess = useCallback(() => {
    const fileNames = selectedFiles.map((file) => file.name).join("\n");
    setServerSuccessMessage(
      `Your files are successfully uploaded.\n${fileNames}`
    );
    setSelectedFiles([]);
    setServerUploadProgress(undefined);
    setBrowserUploadProgress({});
    setErrorMessage(undefined);
    setServerUploadRequestRef(undefined);
  }, [selectedFiles]);

  const handleUpload = useCallback(async () => {
    try {
      setServerUploadProgress(0);
      setErrorMessage(undefined);

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
          throw new Error("File size exceeds the 50MB limit.");
        }
        formData.append("file", file);
      });

      const source = axios.CancelToken.source();
      setServerUploadRequestRef(source);

      await axios.post("https://httpbin.org/post", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total || progressEvent.total === 0) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setServerUploadProgress(progress);
          }
        },
        cancelToken: source.token,
      });

      handleOnSuccess();
    } catch (error: unknown) {
      if (!axios.isCancel(error)) {
        handleOnFail((error as AxiosError).message);
      }
    }
  }, [handleOnSuccess, selectedFiles, handleOnFail]);

  const handleCancelUploadToServer = useCallback(() => {
    if (serverUploadRequestRef) {
      serverUploadRequestRef.cancel();
      setServerUploadRequestRef(undefined);
      setServerUploadProgress(undefined);
      setServerSuccessMessage(undefined);
      setErrorMessage(undefined);
    }
  }, [serverUploadRequestRef]);

  const handleTryAgain = useCallback(() => {
    setErrorMessage(undefined);
  }, []);

  const handleUploadMore = useCallback(() => {
    setServerSuccessMessage(undefined);
  }, []);

  if (errorMessage) {
    return (
      <Grid
        container
        style={{
          boxShadow: "0 1px 5px 0 rgba(0,0,0,.1)",
          padding: "3rem",
        }}
      >
        <ErrorMessage message={errorMessage} onTryAgain={handleTryAgain} />
      </Grid>
    );
  }

  if (serverSuccessMessage) {
    return (
      <Grid
        container
        style={{
          boxShadow: "0 1px 5px 0 rgba(0,0,0,.1)",
          padding: "3rem",
        }}
      >
        <ServerUploadSuccessMessage
          message={serverSuccessMessage}
          onUploadMore={handleUploadMore}
        />
      </Grid>
    );
  }

  return (
    <Grid
      container
      style={{
        boxShadow: "0 1px 5px 0 rgba(0,0,0,.1)",
        padding: "3rem",
      }}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <FileInput
          selectedFiles={selectedFiles}
          onFileInputChange={handleFileInputChange}
          handleUpload={handleUpload}
          removeFile={handleRemoveFile}
          serverUploadProgress={serverUploadProgress}
          browserUploadProgress={browserUploadProgress}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <ServerUploadProgress
          uploadProgress={serverUploadProgress}
          cancelUpload={handleCancelUploadToServer}
        />
      </Grid>
    </Grid>
  );
};

export default FileUpload;

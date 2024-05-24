import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid, Paper, Snackbar, TextField } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Heading from "../Template/Heading";
import {
  ProfilePaper2,
  uploadBlock,
  uploadForm,
  uploadForm2,
  uploadFormContainer,
  uploadFormTextField,
  uploadImagesContainer,
} from "../../../Styles/uploadStyles";
import { useDispatch, useSelector } from "react-redux";
import { buttonStyle } from "../../../Styles/Styles";
import { uploadNewVideo } from "../../../server/apiCalls";

function UploadTemplate() {
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const valueHeading = "Upload New Video";

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(null);

  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.token);
  const userEmail = useSelector((state) => state.user.email);
  const virtualId = useSelector((state) => state.user.v_id);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (type) => {
    if (type === "file") {
      fileInputRef.current.click();
    } else if (type === "video") {
      videoInputRef.current.click();
    }
  };

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg")
    ) {
      setFiles(file);
    } else {
      setOpen(true);
    }
  }, []);

  const handleDropFile = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg")
    ) {
      setFiles(file);
    } else {
      setOpen(true);
    }
  }, []);

  const handleVideoChange = useCallback((e) => {
    const video = e.target.files[0];
    if (video && video.type === "video/mp4") {
      setVideoUploaded(video);
    } else {
      setOpen(true);
    }
  }, []);

  const handleVideoDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const video = e.dataTransfer.files[0];
    if (video && video.type === "video/mp4") {
      setVideoUploaded(video);
    } else {
      setOpen(true);
    }
  }, []);

  const sendVideoUploadRequest = () => {
    const formData = new FormData();
    formData.append("user_email", userEmail);
    formData.append("v_id", virtualId);
    formData.append("title", title);
    formData.append("description", desc);
    if (files) {
      formData.append("file_data", files);
    }
    if (videoUploaded) {
      formData.append("video", videoUploaded);
    }

    uploadNewVideo(userToken, formData, dispatch)
    

    setFiles(null);
    setVideoUploaded(null);
  };

  const clearFormFields = () => {
    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    clearFormFields();
  }, [files, videoUploaded]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Only video files (.mp4) and image files (.png, .jpg, .jpeg) supported!"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        ContentProps={{
          sx: { backgroundColor: "#dc3545" },
        }}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Video uploaded! Redirecting to your dashboard!"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        ContentProps={{
          sx: { backgroundColor: "#5bc0de" },
        }}
      />
      <Heading value={valueHeading} align="left" />
      <Paper style={ProfilePaper2}>
        <div style={uploadForm}>
          <div style={uploadFormContainer}>
            <Grid>
              <TextField
                variant="filled"
                id="title"
                required
                fullWidth
                multiline
                inputProps={{
                  maxLength: 100,
                  minLength: 5,
                }}
                minRows={1}
                maxRows={2}
                margin="dense"
                size="small"
                type="text"
                sx={uploadFormTextField}
                label="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                variant="filled"
                id="description"
                required
                fullWidth
                multiline
                inputProps={{
                  maxLength: 2000,
                  minLength: 2,
                }}
                minRows={5}
                maxRows={10}
                margin="dense"
                size="small"
                type="textarea"
                sx={uploadFormTextField}
                label="Description"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </Grid>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1 }}>
          <div style={uploadForm2}>
            <div style={uploadImagesContainer}>
              {!videoUploaded ? (
                <Box
                  height={150}
                  width={500}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  mr={5}
                  sx={uploadBlock}
                  onClick={() => handleClick("video")}
                  onDrop={handleVideoDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    type="file"
                    ref={videoInputRef}
                    style={{ display: "none" }}
                    onChange={handleVideoChange}
                  />
                  <FileUploadIcon />
                  Video
                </Box>
              ) : (
                <Box
                  height={150}
                  width={500}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  mr={5}
                  sx={uploadBlock}
                  onClick={() => handleClick("video")}
                  onDrop={handleVideoDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <img
                    src={URL.createObjectURL(videoUploaded)}
                    alt="Video Thumbnail"
                  />
                </Box>
              )}
              {!files ? (
                <Box
                  height={150}
                  width={200}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  sx={uploadBlock}
                  onClick={() => handleClick("file")}
                  onDrop={handleDropFile}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <FileUploadIcon />
                  Thumbnail
                </Box>
              ) : (
                <Box
                  height={150}
                  width={200}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  sx={uploadBlock}
                  onClick={() => handleClick("file")}
                  onDrop={handleDropFile}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <img src={URL.createObjectURL(files)} alt="Thumbnail" />
                </Box>
              )}
            </div>
            <button
              variant="contained"
              onClick={sendVideoUploadRequest}
              style={buttonStyle}
            >
              Send
            </button>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default UploadTemplate;

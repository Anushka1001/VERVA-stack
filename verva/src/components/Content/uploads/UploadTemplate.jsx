import React, { useState } from "react";
import { Box, Grid, Paper, TextField } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Heading from "../Template/Heading";
import {
  ProfilePaper2,
  uploadForm,
  uploadForm2,
  uploadFormContainer,
  uploadFormTextField,
  uploadImagesContainer,
} from "../../../Styles/uploadStyles";
import { uploadNewVideo } from "../../../server/apiCalls";
import { useSelector } from "react-redux";
import { buttonStyle } from "../../../Styles/Styles";

function UploadTemplate() {
  const valueHeading = "Upload New Video";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const userToken = useSelector((state) => state.token);
  const userEmail = useSelector((state) => state.user.email);
  const virtualId = useSelector((state) => state.user.v_id);

  const data = {
    user_email: userEmail,
    v_id: virtualId,
    title: title,
    description: desc,
    // video: meadia
    // thumbnail: media
  };

  function sendVideoUploadRequest() {
    uploadNewVideo(userToken, data);
  }

  return (
    <>
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
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              {/* <TextField
                  variant="filled"
                  id="tags"
                  fullWidth
                  inputProps={{
                    maxLength: 2000,
                    minLength: 2,
                  }}
                  margin="dense"
                  size="small"
                  type="text"
                  sx={uploadFormTextField}
                  label="Tags"
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                /> */}
            </Grid>
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1 }}>
          <div style={uploadForm2}>
            <div style={uploadImagesContainer}>
                <Box
                  height={150}
                  width={500}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  mr={5}
                  sx={{ border: "2px dashed grey", opacity: 0.5 }}
                >
                  <FileUploadIcon />Video
                </Box>
                <Box
                  height={150}
                  width={200}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  sx={{ border: "2px dashed grey", opacity: 0.5 }}
                >
                    <FileUploadIcon />Thumbnail
                </Box>
            </div>
                <button variant="contained" onClick={sendVideoUploadRequest} style={buttonStyle}>
                  send
                </button>
          </div>
        </div>
      </Paper>
    </>
  );
}

export default UploadTemplate;

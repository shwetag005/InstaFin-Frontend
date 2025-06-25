"use client";

import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Divider,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw", // Responsive width
  maxWidth: 900,
  bgcolor: "#fff",
  borderRadius: "12px",
  boxShadow: 24,
  p: 0, // Remove padding from outer box
  display: "flex",
  flexDirection: "column",
  maxHeight: "90vh",
};

const headerStyle = {
  p: 2,
  borderBottom: "1px solid #e0e0e0",
};

const contentStyle = {
  p: 2,
  overflowY: "auto",
  flex: "1 1 auto", // Content takes remaining space
};

const footerStyle = {
  p: 2,
  borderTop: "1px solid #e0e0e0",
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
  flexShrink: 0,
};

export default function CommonModal({
  open,
  handleClose=()=>{},
  title = "",
  showFooter = false,
  onSave = () => {},
  onCancel = () => {},
  children,
  saveText = "Save",
  cancelText = "Cancel",
  showTitle = true,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="dynamic-modal-title"
      aria-describedby="dynamic-modal-content"
    >
      <Box sx={style}>
        {showTitle && (
          <Box sx={headerStyle}>
            <Typography
              id="dynamic-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 600 }}
            >
              {title}
            </Typography>
          </Box>
        )}

        <Box id="dynamic-modal-content" sx={contentStyle}>
          {children}
        </Box>

        {showFooter && (
          <Box sx={footerStyle}>
            <Button onClick={onCancel} variant="outlined" color="secondary">
              {cancelText}
            </Button>
            <Button onClick={onSave} variant="contained" color="primary">
              {saveText}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

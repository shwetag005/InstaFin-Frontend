// "use client";

// import React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   Divider,
// } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90vw", // Responsive width
//   maxWidth: 900,
//   bgcolor: "#fff",
//   borderRadius: "12px",
//   boxShadow: 24,
//   p: 0, // Remove padding from outer box
//   display: "flex",
//   flexDirection: "column",
//   maxHeight: "90vh",
// };

// const headerStyle = {
//   p: 2,
//   borderBottom: "1px solid #e0e0e0",
// };

// const contentStyle = {
//   p: 2,
//   overflowY: "auto",
//   flex: "1 1 auto", // Content takes remaining space
// };

// const footerStyle = {
//   p: 2,
//   borderTop: "1px solid #e0e0e0",
//   display: "flex",
//   justifyContent: "flex-end",
//   gap: "1rem",
//   flexShrink: 0,
// };

// export default function CommonModal({
//   open,
//   handleClose=()=>{},
//   title = "",
//   showFooter = false,
//   onSave = () => {},
//   onCancel = () => {},
//   children,
//   onEdit,
//   onPrint,
//   saveText = "Save",
//   cancelText = "Cancel",
//   editText = "Edit",
//   printText = "Print",
//   showTitle = true,
// }) {
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="dynamic-modal-title"
//       aria-describedby="dynamic-modal-content"
//     >
//       <Box sx={style}>
//         {showTitle && (
//           <Box sx={headerStyle}>
//             <Typography
//               id="dynamic-modal-title"
//               variant="h6"
//               component="h2"
//               sx={{ fontWeight: 600 }}
//             >
//               {title}
//             </Typography>
//           </Box>
//         )}

//         <Box id="dynamic-modal-content" sx={contentStyle}>
//           {children}
//         </Box>

//         {showFooter && (
//         <Box sx={footerStyle}>
//         {/* {onPrint && (
//         <Button onClick={onPrint} variant="contained" color="success">
//           {printText}
//         </Button>
//         )} */}

//         <PDFDownloadLink
//         document={<PDFDocument application={modalData} />}
//         fileName={`Loan_Application_${modalData?.personalInfo?.applicantName || 'User'}.pdf`}
//         style={{ textDecoration: 'none' }}
//       >
//         {({ loading }) => (
//           <Button variant="contained" color="success">
//             {loading ? "Generating PDF..." : "Download PDF"}
//           </Button>
//         )}
//       </PDFDownloadLink>

//         {onEdit && (
//         <Button onClick={onEdit} variant="contained" color="warning">
//           {editText}
//         </Button>
//         )}

//         {saveText && onSave && (
//           <Button onClick={onSave} variant="contained" color="primary">
//             {saveText}
//           </Button>
//         )}

//         <Button onClick={onCancel} variant="contained" color="error">
//           {cancelText}
//         </Button>

      
//           </Box>
//         )}

//       </Box>
//     </Modal>
//   );
// }


"use client";

import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "../Applications/PDFDocument"; // make sure path is correct

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: 900,
  bgcolor: "#fff",
  borderRadius: "12px",
  boxShadow: 24,
  p: 0,
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
  flex: "1 1 auto",
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
  handleClose = () => {},
  title = "",
  showFooter = false,
  onSave = () => {},
  onCancel = () => {},
  children,
  onEdit,
  modalData, // ✅ make sure to pass this from parent
  saveText = "Save",
  cancelText = "Cancel",
  editText = "Edit",
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
            {/* ✅ Replaced Print button with Download PDF */}
            {modalData && (
              <PDFDownloadLink
                document={<PDFDocument application={modalData} />}
                fileName={`Loan_Application_${modalData?.personalInfo?.applicantName || "User"}.pdf`}
                style={{ textDecoration: "none" }}
              >
                {({ loading }) => (
                  <Button variant="contained" color="success">
                    {loading ? "Generating PDF..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            )}

            {onEdit && (
              <Button onClick={onEdit} variant="contained" color="warning">
                {editText}
              </Button>
            )}

            {saveText && onSave && (
              <Button onClick={onSave} variant="contained" color="primary">
                {saveText}
              </Button>
            )}

            <Button onClick={onCancel} variant="contained" color="error">
              {cancelText}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

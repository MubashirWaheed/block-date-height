import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import simpleBtcQR from "../images/simpleBtcQR.png";
import { Typography } from "@mui/material";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 270, sm: 400 },
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const BitcoinModal = ({ openBitcoinModal, handleBitcoinModal }) => {
  return (
    <div>
      <Modal open={openBitcoinModal} onClose={handleBitcoinModal}>
        <Box sx={style}>
          <Typography>Bitcoin</Typography>
          <Typography sx={{ wordWrap: "break-word" }}>
            3BHyEzjmrbkvSVpMKSYnLuCQVc8uiGJn3M
          </Typography>
          <Box
            component="img"
            src={simpleBtcQR}
            sx={{
              marginTop: { sm: 6, xs: 2 },
              cursor: "pointer",
              height: { sm: 300, xs: 150 },
              width: { sm: 300, xs: 150 },
            }}
            alt="simple bitcoin QR"
          />
        </Box>
      </Modal>
    </div>
  );
};

export default BitcoinModal;

import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import lightningQR from "../images/lightningQR.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, sm: 350 },
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const LightningModal = ({ openLightningModal, handleLightningModal }) => {
  return (
    <Modal open={openLightningModal} onClose={handleLightningModal}>
      <Box sx={style}>
        <Typography textAlign="center" fontWeight={600}>
          Lightning
        </Typography>
        <Typography sx={{ mt: 2, wordWrap: "break-word" }}>
          LNURL1DP68GURN8GHJ7AMPD3KX2AR0VEEKZAR0WD5XJTNRDAKJ7TNHV4KXCTTTDEHHWM30D3H82UNVWQHKSAT8V43K7MTDVYUNJZJ34YD
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src={lightningQR}
            sx={{
              marginTop: { sm: 6, xs: 2 },
              cursor: "pointer",
              height: { sm: 300, xs: 150 },
              width: { sm: 300, xs: 150 },
            }}
            alt="simple bitcoin QR"
          />
        </div>
      </Box>
    </Modal>
  );
};

export default LightningModal;

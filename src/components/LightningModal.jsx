import { IconButton, Modal, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import lightningQR from "../images/lightningQR.png";
import CopyIcon from "../images/copy.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, sm: 370 },
  bgcolor: "#ff9416",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
const LightningModal = ({ openLightningModal, handleLightningModal }) => {
  return (
    <Modal open={openLightningModal} onClose={handleLightningModal}>
      <Box sx={style}>
        <Typography
          textAlign="center"
          color="white"
          fontWeight={600}
          fontSize={24}
        >
          Lightning
        </Typography>

        <Typography color="white" sx={{ mt: 2, wordWrap: "break-word" }}>
          LNURL1DP68GURN8GHJ7AMPD3KX2AR0VEEKZAR0WD5XJTNRDAKJ7TNHV4KXCTTTDEHHWM30D3H82UNVWQHKSAT8V43K7MTDVYUNJZJ34YD
        </Typography>
        <Tooltip title="copy lightning address" sx={{ marginLeft: "44%" }}>
          <IconButton
            onClick={() =>
              navigator.clipboard.writeText(
                "LNURL1DP68GURN8GHJ7AMPD3KX2AR0VEEKZAR0WD5XJTNRDAKJ7TNHV4KXCTTTDEHHWM30D3H82UNVWQHKSAT8V43K7MTDVYUNJZJ34YD"
              )
            }
          >
            <img src={CopyIcon} alt="copy lightning address" />
          </IconButton>
        </Tooltip>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src={lightningQR}
            sx={{
              marginTop: { sm: 1, xs: 2 },
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

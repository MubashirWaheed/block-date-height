import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { IconButton, Tooltip, Typography } from "@mui/material";
import simpleBtcQR from "../images/simpleBtcQR.png";
import CopyIcon from "../images/copy.svg";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 270, sm: 400 },
  bgcolor: "#ff9416",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const BitcoinModal = ({ openBitcoinModal, handleBitcoinModal }) => {
  return (
    <div>
      <Modal open={openBitcoinModal} onClose={handleBitcoinModal}>
        <Box sx={style}>
          <Typography color="white" fontWeight={600} fontSize={24}>
            Bitcoin
          </Typography>
          <Typography color="white" px={2} sx={{ wordWrap: "break-word" }}>
            3BHyEzjmrbkvSVpMKSYnLuCQVc8uiGJn3M
          </Typography>
          <Tooltip title="copy bitcoin address">
            <IconButton
              onClick={() =>
                navigator.clipboard.writeText(
                  "3BHyEzjmrbkvSVpMKSYnLuCQVc8uiGJn3M"
                )
              }
            >
              <img src={CopyIcon} alt="copy bitcoin address" />
            </IconButton>
          </Tooltip>

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

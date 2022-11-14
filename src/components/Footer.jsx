import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import BitcoinModal from "./BitcoinModal";
import lightningLogo from "../images/lightningLogo.png";
import bitcoinImage from "../images/bitcoin.png";
import LightningModal from "./LightningModal";

const Footer = () => {
  const [openBitcoinModal, setOpenBitcoinModal] = useState(false);
  const [openLightningModal, setOpenLightningModal] = useState(false);
  const handleBitcoinModal = () => setOpenBitcoinModal((value) => !value);
  const handleLightningModal = () => setOpenLightningModal((value) => !value);
  return (
    <div>
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Typography variant="body1">
            Buy us a coffee? Click and Scan here
          </Typography>
          <Box
            onClick={handleBitcoinModal}
            component="img"
            src={bitcoinImage}
            sx={{
              cursor: "pointer",
              height: { sm: 20, xs: 25 },
              width: { sm: 40, xs: 35 },
            }}
            alt="buy us a coffee"
          />
          <BitcoinModal
            openBitcoinModal={openBitcoinModal}
            handleBitcoinModal={handleBitcoinModal}
          />
          {/* LIGHTNING MODAL  */}
          <Box
            onClick={handleLightningModal}
            component="img"
            src={lightningLogo}
            sx={{
              cursor: "pointer",
              height: { sm: 35, xs: 25 },
              width: { sm: 60, xs: 35 },
            }}
            alt="buy us a coffee"
          />
          <LightningModal
            openLightningModal={openLightningModal}
            handleLightningModal={handleLightningModal}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Footer;

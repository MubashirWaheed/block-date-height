import React, { useState } from "react";
import { Box, IconButton, Link, Typography } from "@mui/material";
import BitcoinModal from "./BitcoinModal";
import LightningModal from "./LightningModal";
import lightningLogo from "../images/lightningLogo.png";
import bitcoinImage from "../images/bitcoin.png";
import CupIcon from "../images/CupIcon.svg";
import TwitterSvg from "../images/twitter.svg";

const Footer = () => {
  const [openBitcoinModal, setOpenBitcoinModal] = useState(false);
  const [openLightningModal, setOpenLightningModal] = useState(false);
  const handleBitcoinModal = () => setOpenBitcoinModal((value) => !value);
  const handleLightningModal = () => setOpenLightningModal((value) => !value);
  return (
    <Box>
      <Link
        href="https://twitter.com/metranite"
        position="absolute"
        sx={{ color: "black", cursor: "pointer" }}
        right={50}
        bottom={80}
        underline="none"
        target="_blank"
        rel="noopener"
      >
        <IconButton sx={{ p: "0" }}>
          <img src={TwitterSvg} alt="twitter icon" />
        </IconButton>
        @metranite
      </Link>
      <Box
        bgcolor="white"
        mb={0}
        sx={{ position: "fixed", bottom: "0", right: "0", width: "100%" }}
      >
        <Box
          display="flex"
          justifyContent="right"
          alignItems="center"
          my={2}
          pr={1}
        >
          <IconButton>
            <img src={CupIcon} alt="Cup Icon" />
          </IconButton>
          <Typography
            // variant="body1"
            sx={{ variant: { xs: "caption", sm: "body1" } }}
            color="#4F4F4F"
          >
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
      </Box>
    </Box>
  );
};

export default Footer;

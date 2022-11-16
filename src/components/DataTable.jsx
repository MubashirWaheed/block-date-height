import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  display: "flex",
  flexDirection: "column",
};

const DataTable = ({
  blockData,
  seconds,
  setMessage,
  setDisplay,
  setBlockData,
}) => {
  const [block, setBlock] = useState();
  const [formatedTime, setFormatedTime] = useState();
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    if (blockData.length > 0 && blockData !== undefined) {
      let closest = blockData.reduce(function (r, a, i, aa) {
        return i && Math.abs(aa[r].time - seconds) < Math.abs(a.time - seconds)
          ? r
          : i;
      }, -1);
      setBlock(blockData[closest]);
      setMessage("The Block Height on");
      setDisplay(false);
      let utcSeconds = blockData[closest].time;
      let d = new Date(0);
      d.setUTCSeconds(utcSeconds);
      const formated = format(d, "PPpp");
      setFormatedTime(formated);
      setShowComponent(true);
    } else {
      setBlock({ height: 0 });
      setShowComponent(false);
    }
  }, [seconds, blockData]);

  return (
    <Container>
      {block && (
        <Box>
          <Typography variant="h2" mt={2}>
            {block.height}
          </Typography>
          {!showComponent && (
            <Typography mt={3} variant="h6">
              Chancellor on Brink of Second Bailout for Banks{" "}
            </Typography>
          )}
          {showComponent && (
            <Box sx={style}>
              <Box
                lineHeight={1}
                display="flex"
                justifyContent="center"
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: { xs: "wrap" },
                }}
                gap={2}
                pt={2}
              >
                <Typography> Don't Trust, Verify -</Typography>
                <Box display="flex" gap={2} justifyContent="center">
                  <Link
                    href={`http://blockstream.info/block/${block.hash}`}
                    underline="none"
                    target="_blank"
                    sx={{ cursor: "pointer" }}
                  >
                    Blockstream
                  </Link>
                  <Link
                    href={`https://www.blockchain.com/explorer/blocks/btc/${block.hash}`}
                    underline="none"
                    target="_blank"
                    sx={{ cursor: "pointer" }}
                  >
                    Blockchain
                  </Link>
                  <Link
                    href={`https://btcscan.org/block/${block.hash}`}
                    underline="none"
                    target="_blank"
                    sx={{ cursor: "pointer" }}
                  >
                    Btcscan
                  </Link>
                </Box>
              </Box>

              <Typography sx={{ wordWrap: "break-word" }} mt={3}>
                Hash: {block.hash}
              </Typography>

              <Typography>Date: {formatedTime}</Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default DataTable;

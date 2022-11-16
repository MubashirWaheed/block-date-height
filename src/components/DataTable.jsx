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

const DataTable = ({ blockData, seconds, setMessage, setDisplay }) => {
  const [block, setBlock] = useState();
  const [formatedTime, setFormatedTime] = useState();

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
    }
  }, [seconds, blockData]);

  return (
    <Container>
      {block && (
        <Box>
          <Typography variant="h2">{block.height}</Typography>
          <Box
            lineHeight={1}
            display="flex"
            justifyContent="center"
            sx={{ flexWrap: { xs: "wrap" } }}
            gap={2}
          >
            <Typography> Don't Trust, Verify -</Typography>
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
          <Typography sx={{ wordWrap: "break-word" }} mt={3}>
            Hash: {block.hash}
          </Typography>
          <Typography>Date: {formatedTime}</Typography>
        </Box>
      )}

      {blockData.length < 1 && (
        <Typography mt={2} variant="h6">
          No block found
        </Typography>
      )}
    </Container>
  );
};

export default DataTable;

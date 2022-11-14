import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";

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

const MobileTable = ({ blockData, seconds, setMessage, setDisplay }) => {
  // search through the array and fod nearest value
  const [block, setBlock] = useState();
  const [formatedTime, setFormatedTime] = useState();

  useEffect(() => {
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
  }, [seconds, blockData]);

  return (
    <div>
      {!block && <Typography>Fetcing data please wait </Typography>}
      {block && (
        <Box px={1} mt={2}>
          <TableContainer component={Paper}>
            <Table
              sx={{
                width: { xs: 100, sm: 130 },
              }}
            >
              <TableBody>
                <TableRow>
                  <StyledTableCell variant="head">Hash</StyledTableCell>
                  <TableCell>{block.hash}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell variant="head">
                    Time (in seconds)
                  </StyledTableCell>
                  <TableCell>{block.time}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell variant="head">Time</StyledTableCell>
                  <TableCell>{formatedTime}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell variant="head">Block Index</StyledTableCell>
                  <TableCell>{block.block_index}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default MobileTable;

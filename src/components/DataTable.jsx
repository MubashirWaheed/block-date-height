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
    <Container>
      {block && (
        <TableContainer component={Paper} sx={{ my: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="block data table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Hash</StyledTableCell>
                <StyledTableCell align="right">Height</StyledTableCell>
                <StyledTableCell align="center">
                  Time in seconds
                </StyledTableCell>
                <StyledTableCell align="center">Time</StyledTableCell>
                <StyledTableCell align="left">Block-Index</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <TableCell>{block.hash}</TableCell>
                <TableCell>{block.height}</TableCell>
                <TableCell align="center">{block.time}</TableCell>
                <TableCell>{formatedTime}</TableCell>
                <TableCell>{block.block_index}</TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default DataTable;

import "./App.css";
import { useState, useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import DataTable from "./components/DataTable";
import {
  Button,
  CircularProgress,
  IconButton,
  Link,
  Paper,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import bitcoinImage from "./images/bitcoin.png";
import Footer from "./components/Footer";
import useWindowSize from "./hooks/useWindowSize";
import Background from "./images/background.png";
import TwitterSvg from "./images/twitter.svg";
// import LoadingButton from "@mui"

const disablePast = "Tue 3 Jan 2009 19:26:00 GMT";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Background})`,
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

function App() {
  const [blockData, setBlockData] = useState();
  const [seconds, setSeconds] = useState();
  const onLoadDateTime = new Date();
  onLoadDateTime.setMinutes(onLoadDateTime.getMinutes() - 15);

  const [value, setValue] = useState(onLoadDateTime);

  const [message, setMessage] = useState("Welcome to BlockHeightDate");
  const [display, setDisplay] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (newValue) => {
    let secondsEpoch = Math.round(newValue / 1000);
    setSeconds(secondsEpoch);
    setValue(newValue);
  };

  const getNewData = () => {
    setLoading(true);
    setBlockData();
    fetch(`/.netlify/functions/node-fetch?seconds=${seconds}`, {
      headers: { accept: "Accept: application/json" },
    })
      .then((x) => x.json())
      .then((data) => {
        setBlockData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    let timeInSeconds = Math.round(value / 1000);
    setSeconds(timeInSeconds);
  }, []);

  return (
    <div className="App">
      <Box bgcolor="#ff9416" width="100%" height="50px"></Box>

      <Box
        bgcolor="#ff9416"
        minHeight="92%"
        display="flex"
        flexDirection="column"
      >
        <Paper
          // sx={{ flexGrow: 1 }}
          style={styles.paperContainer}
          sx={{ height: { xs: 170, sm: 280 } }}
        >
          <Box
            component="img"
            src={bitcoinImage}
            sx={{
              height: { sm: 170, xs: 100 },
              width: { sm: 315, xs: 175 },
            }}
          />
          <Typography
            mt={1}
            fontSize={{ sm: 60, xs: 30 }}
            fontStyle="italic"
            lineHeight={1}
            gutterBottom
          >
            {message}
          </Typography>
        </Paper>
        {display && (
          <Typography
            color="white"
            sx={{ fontSize: { sm: 24, xs: 16 } }}
            mt={2}
            px={2}
          >
            Enter a date + time to know the Bitcoin blockheight at that moment
          </Typography>
        )}
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            mt={2}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={value}
                onChange={handleChange}
                minDate={disablePast}
                disableFuture={true}
                // onError
                renderInput={(params) => (
                  <TextField
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    {...params}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 2,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              sx={{ fontStyle: "italic" }}
              onClick={getNewData}
            >
              GO
            </Button>
          </Box>
          <Typography color="white" mt={2}>
            Enter time in your local timezone
          </Typography>
          {!blockData && loading && (
            <Box mt={5}>
              <CircularProgress />
            </Box>
          )}

          {!display && (
            <Typography color="white" mt={2} fontSize={25}>
              was
            </Typography>
          )}
        </Container>

        {blockData && (
          <DataTable
            blockData={blockData}
            seconds={seconds}
            setMessage={setMessage}
            setDisplay={setDisplay}
            setBlockData={setBlockData}
          />
        )}
        <Link
          mt="auto"
          mr={2}
          pt={2}
          alignSelf="flex-end"
          href="https://twitter.com/metranite"
          sx={{ color: "black", cursor: "pointer" }}
          underline="none"
          target="_blank"
          rel="noopener"
        >
          <IconButton sx={{ p: "0" }}>
            <img src={TwitterSvg} alt="twitter icon" />
          </IconButton>
          @metranite
        </Link>
        <Box bgcolor="white">
          <Footer />
        </Box>
      </Box>
    </div>
  );
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import DataTable from "./components/DataTable";
import { AppBar, Button, IconButton, Paper, Toolbar } from "@mui/material";
import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import bitcoinImage from "./images/bitcoin.png";
import Footer from "./components/Footer";
import useWindowSize from "./hooks/useWindowSize";
import MobileTable from "./components/MobileTable";
import Background from "./images/background.png";
import HomeIcon from "./images/Home.svg";

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

  const handleChange = (newValue) => {
    let secondsEpoch = Math.round(newValue / 1000);
    setSeconds(secondsEpoch);
    setValue(newValue);
  };

  const getNewData = () => {
    fetch(`/.netlify/functions/node-fetch?seconds=${seconds}`, {
      headers: { accept: "Accept: application/json" },
    })
      .then((x) => x.json())
      .then((data) => {
        console.log("DATA ON 6 JANUARY: ", data);
        setBlockData(data);
      });
  };

  useEffect(() => {
    let timeInSeconds = Math.round(value / 1000);
    setSeconds(timeInSeconds);
  }, []);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }} bgcolor="#ff9416">
        <AppBar position="static" sx={{ bgcolor: "#ff9416" }}>
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={HomeIcon} alt="Home icon" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Box bgcolor="#ff9416" height="100%">
        <Paper
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
                renderInput={(params) => (
                  <TextField
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
          />
        )}
      </Box>
      <Footer />
    </div>
  );
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import DataTable from "./components/DataTable";
import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import bitcoinImage from "./images/bitcoin.png";
import Footer from "./components/Footer";
import useWindowSize from "./hooks/useWindowSize";
import MobileTable from "./components/MobileTable";

function App() {
  const [blockData, setBlockData] = useState();
  const [seconds, setSeconds] = useState();
  const onLoadDateTime = new Date();
  onLoadDateTime.setMinutes(onLoadDateTime.getMinutes() - 15);

  const [value, setValue] = useState(onLoadDateTime);

  const size = useWindowSize();
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
      .then((data) => setBlockData(data));
  };

  useEffect(() => {
    let timeInSeconds = Math.round(value / 1000);
    setSeconds(timeInSeconds);
  }, []);

  return (
    <div className="App">
      <Box
        component="img"
        src={bitcoinImage}
        sx={{
          height: { sm: 200, xs: 100 },
          width: { sm: 350, xs: 175 },
        }}
      />
      <Typography sx={{ typography: { sm: "h4", xs: "h6" } }} gutterBottom>
        {message}
      </Typography>
      {display && (
        <Typography>
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
              label="Select Date&Time "
              value={value}
              onChange={handleChange}
              disableFuture={true}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={getNewData}>
            Enter
          </Button>
        </Box>
        {!display && <Typography mt={2}>was</Typography>}
      </Container>

      {blockData && size.width > 800 && (
        <DataTable
          blockData={blockData}
          seconds={seconds}
          setMessage={setMessage}
          setDisplay={setDisplay}
        />
      )}
      {/* MOBILE VIEW  */}
      {blockData && size.width <= 800 && (
        <MobileTable
          blockData={blockData}
          seconds={seconds}
          setMessage={setMessage}
          setDisplay={setDisplay}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;

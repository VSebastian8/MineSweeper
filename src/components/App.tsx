import "./App.css";
import Board from "./Board";
import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#14b8a6",
    },
    secondary: {
      main: "#f43f5e",
    },
  },
});

function App() {
  const [refreshed, setRefreshed] = useState(false);
  const [retried, setRetried] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [gameState, setGameState] = useState(0); //0 is ongoing, 1 is won, 2 is lost
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] =
    useState<ReturnType<typeof setInterval>>();
  const bombs = 20;
  const rows = 8;
  const columns = 12;

  const startTimer = () => {
    setTimerInterval(
      setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000)
    );
  };

  const getTime = () => {
    if (timer > 3600) return "Took too long!";
    if (timer < 60) return timer;
    return (
      Math.floor(timer / 60) + ":" + (timer % 60 < 10 ? "0" : "") + (timer % 60)
    );
  };

  const handleRefresh = () => {
    setGameState(0);
    setRefreshed(!refreshed);
    clearInterval(timerInterval);
    setTimer(0);
  };

  const handleRetry = () => {
    setGameState(0);
    setRetried(!retried);
    clearInterval(timerInterval);
    setTimer(0);
  };

  const handleReveal = (newVal: number) => {
    if (revealed == 0 && newVal > 0) startTimer();
    setRevealed(newVal);
  };

  const handleGame = (won: boolean) => {
    if (won) setGameState(1);
    else setGameState(2);
  };

  useEffect(() => {
    clearInterval(timerInterval);
  }, [gameState]);

  return (
    <ThemeProvider theme={theme}>
      <div id="container">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="h6"
              color={
                gameState == 1 ? "primary" : gameState == 2 ? "secondary" : ""
              }
            >
              Timer: {getTime()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="#818cf8" variant="h6" component="h6">
              Revealed: {revealed} / {rows * columns - bombs}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Board
              rows={rows}
              columns={columns}
              bombNumber={bombs}
              squareSize={30}
              refresh={refreshed}
              retry={retried}
              update={handleReveal}
              finish={handleGame}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" variant="contained" onClick={handleRetry}>
              Retry
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" onClick={handleRefresh}>
              Refresh
            </Button>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;

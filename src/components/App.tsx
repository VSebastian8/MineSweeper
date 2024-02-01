import "./App.css";
import Board from "./Board";
import { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
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
  const bombs = 25;
  const rows = 8;
  const columns = 14;

  const handleRefresh = () => {
    setRefreshed(!refreshed);
  };

  const handleRetry = () => {
    setRetried(!retried);
  };

  const handleReveal = (newVal: number) => {
    setRevealed(newVal);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography variant="h6" component="h6">
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
      </Grid>
    </ThemeProvider>
  );
}

export default App;

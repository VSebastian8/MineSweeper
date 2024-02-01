import "./App.css";
import Board from "./Board";
// import { Button, Grid, Typography } from "@material-ui/core";
import { useState } from "react";

function App() {
  const [refreshed, setRefreshed] = useState(false);
  const [retried, setRetried] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const bombs = 10;
  const rows = 8;
  const columns = 10;

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
    <>
    <h5> Revealed: {revealed} / {rows * columns - bombs}</h5>
     <Board
          rows={rows}
          columns={columns}
          bombNumber={bombs}
          squareSize={30}
          refresh={refreshed}
          retry={retried}
          update={handleReveal}
        />
        <button onClick={handleRetry}>Retry</button>
        <button onClick={handleRefresh}>Refresh</button>
    </>
    // <Grid
    //   container
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="center"
    //   spacing={2}
    // >
    //   <Grid item xs={12}>
    //     <Typography variant="h6" component="h6">
    //       Revealed: {revealed} / {rows * columns - bombs}
    //     </Typography>
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Board
    //       rows={rows}
    //       columns={columns}
    //       bombNumber={bombs}
    //       squareSize={30}
    //       refresh={refreshed}
    //       retry={retried}
    //       update={handleReveal}
    //     />
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Button color="secondary" variant="contained" onClick={handleRetry}>
    //       Retry
    //     </Button>
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Button color="primary" variant="contained" onClick={handleRefresh}>
    //       Refresh Board
    //     </Button>
    //   </Grid>
    // </Grid>
  );
}

export default App;

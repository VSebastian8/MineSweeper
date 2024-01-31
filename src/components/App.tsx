import "./App.css";
import Board from "./Board";
import { Button, Grid } from "@material-ui/core";
import { useState } from "react";

function App() {
  const [refreshed, setRefreshed] = useState(false);
  const [retried, setRetried] = useState(false);

  const handleRefresh = () => {
    setRefreshed(!refreshed);
  };

  const handleRetry = () => {
    setRetried(!retried);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Board
          rows={7}
          columns={10}
          bombNumber={20}
          refresh={refreshed}
          retry={retried}
        />
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="contained" onClick={handleRetry}>
          Retry
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button color="primary" variant="contained" onClick={handleRefresh}>
          Refresh Board
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;

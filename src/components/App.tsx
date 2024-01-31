import "./App.css";
import Board from "./Board";
import { Button, Grid } from "@material-ui/core";

function App() {
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
        <Board rows={7} columns={10} bombNumber={20} />
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="contained">
          MineSweeper
        </Button>
      </Grid>
    </Grid>
  );
}

export default App;

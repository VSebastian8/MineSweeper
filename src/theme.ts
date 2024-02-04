import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    myCustomColor?: Palette['primary'];
  }
  interface PaletteOptions {
    myCustomColor?: PaletteOptions['primary'];
  }
}
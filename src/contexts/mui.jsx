import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { faIR } from "@mui/material/locale";

const MuiProvider = ({ children }) => {
  const theme = createTheme(
    {
      direction: "rtl",
      palette: {
        // mode: outerTheme.palette.mode,
      },
      typography: {
        fontFamily: `shabnam`,
      },
    },
    faIR
  );

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};

export default MuiProvider;

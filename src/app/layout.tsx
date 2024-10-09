'use client'

import "@/styles/globals.css";
import { CssBaseline, Drawer, ThemeProvider, createTheme } from '@mui/material';
import MinDrawer from '@/ui/Drower';
const theme = createTheme();

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html lang="jp">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel='manifest' href='manifest.json' />
          <title>title</title>
        </head>
        <body>
          <div className="min-h-screen">
            <MinDrawer >
              {children}
            </MinDrawer>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}

'use client'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = createTheme()
const queryClient = new QueryClient()

export default function CoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}



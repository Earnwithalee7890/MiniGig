import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config/wagmi'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()

/**
 * Entry point for the MiniGig React application.
 * Re-renders the root element with Wagmi and React Query providers.
 * Optimized for Celo MiniPay.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)

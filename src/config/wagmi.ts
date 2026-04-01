import { http, createConfig } from 'wagmi'
import { celo, celoSepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [celo, celoSepolia],
  connectors: [
    injected({
      target: 'metaMask',
    }),
    injected({
      target: {
        id: 'minipay',
        name: 'MiniPay',
        provider: (window as any).ethereum,
      }
    }),
  ],
  transports: {
    [celo.id]: http('https://forno.celo.org'),
    [celoSepolia.id]: http('https://sepolia-forno.celo-testnet.org'),
  },
})

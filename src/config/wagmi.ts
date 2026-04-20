import { http, createConfig } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [celo, celoAlfajores],
  connectors: [
    injected(),
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
    [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org'),
  },
})

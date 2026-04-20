import { useState, useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';

/**
 * Custom hook to detect and manage Celo MiniPay native connections.
 * Automatically connects to MiniPay's injected provider if detected.
 */
export const useMiniPayConnection = () => {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const detect = () => {
      const provider = (window as any).ethereum;
      const isMP = provider?.isMiniPay || provider?.isOpera;
      
      if (isMP) {
        setIsMiniPay(true);
        // Find suitable connector (MiniPay target or catch-all injected)
        const connector = connectors.find(c => 
          c.id.toLowerCase().includes('minipay') || 
          c.name.toLowerCase().includes('injected')
        );
        
        if (connector && !isConnected) {
          connect({ connector });
        }
      }
    };

    detect();
    // Re-check after a short delay to account for progressive provider injection
    const timer = setTimeout(detect, 1000);
    return () => clearTimeout(timer);
  }, [connect, connectors, isConnected]);

  return { isMiniPay };
};

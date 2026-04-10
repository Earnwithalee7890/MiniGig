import { useState, useEffect } from 'react';
import { useConnect, useAccount } from 'wagmi';

export const useMiniPayConnection = () => {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const checkMiniPay = () => {
      if ((window as any).ethereum?.isMiniPay) {
        setIsMiniPay(true);
        const connector = connectors.find(c => c.id === 'minipay' || (c as any).target === 'metaMask');
        if (connector && !isConnected) {
          connect({ connector });
        }
      }
    };

    checkMiniPay();
    const timer = setTimeout(checkMiniPay, 500);
    return () => clearTimeout(timer);
  }, [connect, connectors, isConnected]);

  return { isMiniPay };
};

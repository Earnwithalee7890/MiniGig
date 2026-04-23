import React from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';

export const WalletStatus: React.FC = () => {
  const { isConnected, chain } = useAccount();

  if (!isConnected) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ 
        display: 'flex', alignItems: 'center', gap: '8px', 
        fontSize: '10px', opacity: 0.6, marginBottom: '16px' 
      }}
    >
      <div style={{ 
        width: '6px', height: '6px', borderRadius: '50%', 
        background: chain?.id === 42220 ? 'var(--celo-green)' : '#ff4d4d' 
      }} />
      <span>Connected to {chain?.name || 'Unknown Network'}</span>
    </motion.div>
  );
};

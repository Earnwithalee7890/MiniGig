import React from 'react';
import { motion } from 'framer-motion';
import { shortenAddress, copyToClipboard } from '../utils/helpers';

interface HeaderProps {
  address?: `0x${string}`;
  isConnected: boolean;
  isMiniPay: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Header = ({ address, isConnected, isMiniPay, onConnect, onDisconnect }: HeaderProps) => {
  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo.png" alt="MiniGig Logo" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
        <div>
          <h1 className="gradient-text">MiniGig</h1>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <p style={{ fontSize: '10px', opacity: 0.6, letterSpacing: '1px' }}>CELO PROOF OF SHIP</p>
            <span style={{ fontSize: '10px', borderRadius: '4px', padding: '1px 4px', background: 'rgba(255,255,255,0.1)', color: 'var(--celo-gold)' }}>SOLO</span>
          </div>
          {isMiniPay && (
            <div className="minipay-badge">
              <div style={{ width: '6px', height: '6px', background: 'var(--celo-green)', borderRadius: '50%', boxShadow: '0 0 5px var(--celo-green)' }}></div>
              MiniPay Native
            </div>
          )}
        </div>
      </div>
      {!isConnected ? (
        !isMiniPay && (
          <button onClick={onConnect} className="btn-primary" style={{ padding: '8px 16px', width: 'auto' }}>
            Enter
          </button>
        )
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={async () => {
            if (address) {
              const success = await copyToClipboard(address);
              if (success) {
                // We'll handle feedback better later
              }
            }
            onDisconnect();
          }} 
          className="address-badge"
          style={{ cursor: 'pointer', fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '12px' }}
        >
          {shortenAddress(address || '')}
        </motion.div>
      )}
    </div>
  );
};

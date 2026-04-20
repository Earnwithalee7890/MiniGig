import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { shortenAddress, copyToClipboard } from '../utils/helpers';

interface HeaderProps {
  address?: `0x${string}`;
  isConnected: boolean;
  isMiniPay: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Header = ({ address, isConnected, isMiniPay, onConnect, onDisconnect }: HeaderProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (address) {
      const success = await copyToClipboard(address);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo.png" alt="MiniGig Logo" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
        <div>
          <h1 className="gradient-text">MiniGig</h1>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <p style={{ fontSize: '10px', opacity: 0.6, letterSpacing: '1px' }}>CELO PROOF OF SHIP</p>
            <span 
              onClick={() => alert('MiniGig is a solo developer project by earnwithalee for the Celo Proof of Ship competition.')}
              style={{ cursor: 'help', fontSize: '10px', borderRadius: '4px', padding: '1px 4px', background: 'rgba(255,255,255,0.1)', color: 'var(--celo-gold)' }}
            >
              SOLO
            </span>
          </div>
          {isMiniPay && (
            <div className="minipay-badge">
              <div className="minipay-indicator"></div>
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
          onClick={() => onDisconnect()}
          className="address-badge flex-center"
          style={{ 
            cursor: 'pointer', fontSize: '12px', background: 'rgba(255,255,255,0.08)', 
            padding: '6px 10px', borderRadius: '12px', gap: '8px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <span>{shortenAddress(address || '')}</span>
          <div 
            onClick={handleCopy}
            style={{ 
              padding: '4px', background: 'rgba(255,255,255,0.1)', 
              borderRadius: '6px', display: 'flex', alignItems: 'center' 
            }}
          >
            {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} opacity={0.6} />}
          </div>
        </motion.div>
      )}
    </div>
  );
};

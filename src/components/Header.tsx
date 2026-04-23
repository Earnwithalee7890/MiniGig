import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { shortenAddress, copyToClipboard } from '../utils/helpers';

interface HeaderProps {
  address?: `0x${string}`;
  isConnected: boolean;
  isMiniPay: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onToggleGlass: () => void;
}

export const Header = ({ address, isConnected, isMiniPay, onConnect, onDisconnect, onToggleGlass }: HeaderProps) => {
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
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <h1 className="gradient-text">MiniGig</h1>
            <button 
              onClick={onToggleGlass}
              style={{ 
                background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '4px',
                fontSize: '8px', color: '#fff', cursor: 'pointer', padding: '2px 4px'
              }}
            >
              ✨
            </button>
          </div>
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
          whileHover={{ background: 'rgba(255,255,255,0.12)' }}
          className="address-badge flex-center"
          style={{ 
            cursor: 'pointer', fontSize: '12px', background: 'rgba(255,255,255,0.08)', 
            padding: '8px 12px', borderRadius: '14px', gap: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'var(--transition)'
          }}
        >
          <span style={{ fontWeight: '600', opacity: 0.9 }}>{shortenAddress(address || '')}</span>
          <motion.div 
            whileTap={{ scale: 0.8 }}
            onClick={handleCopy}
            style={{ 
              padding: '6px', background: 'rgba(255,255,255,0.1)', 
              borderRadius: '8px', display: 'flex', alignItems: 'center',
              color: copied ? 'var(--celo-green)' : 'inherit'
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} opacity={0.6} />}
          </motion.div>
          <div onClick={onDisconnect} style={{ opacity: 0.3, marginLeft: '4px', fontSize: '10px' }}>✕</div>
        </motion.div>
      )}
    </div>
  );
};
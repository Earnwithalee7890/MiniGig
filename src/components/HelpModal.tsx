import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass"
            style={{ position: 'relative', width: '100%', maxWidth: '400px', padding: '32px', borderRadius: '24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <HelpCircle className="text-celo-gold" />
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>MiniGig Help</h2>
              </div>
              <X onClick={onClose} style={{ cursor: 'pointer', opacity: 0.5 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '60vh', overflowY: 'auto' }}>
              <div>
                <h3 style={{ fontSize: '14px', color: 'var(--celo-gold)', marginBottom: '8px' }}>What is Daily Check-in?</h3>
                <p style={{ fontSize: '13px', opacity: 0.7 }}>A low-gas transaction that records your activity on-chain. Doing this daily builds your streak!</p>
              </div>
              <div>
                <h3 style={{ fontSize: '14px', color: 'var(--celo-gold)', marginBottom: '8px' }}>How do I earn XP?</h3>
                <p style={{ fontSize: '13px', opacity: 0.7 }}>By completing gigs and maintaining a daily streak. Higher streaks give XP multipliers.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '14px', color: 'var(--celo-gold)', marginBottom: '8px' }}>What is MiniPay?</h3>
                <p style={{ fontSize: '13px', opacity: 0.7 }}>A lightweight Celo wallet inside Opera Mini. MiniGig is optimized for the best MiniPay experience.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

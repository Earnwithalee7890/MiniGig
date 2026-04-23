import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  status: 'wallet' | 'mining' | 'success' | 'error';
  error?: string | null;
  hash?: string;
  onClose: () => void;
}

export const TransactionModal = ({ isOpen, status, error, hash, onClose }: TransactionModalProps) => {
  if (!isOpen) return null;

  const getContent = () => {
    switch (status) {
      case 'wallet':
        return {
          title: 'Confirm Transaction',
          desc: 'Please confirm the transaction in your wallet to proceed.',
          icon: <Loader2 className="animate-spin text-celo-gold" size={48} />,
          color: 'var(--celo-gold)'
        };
      case 'mining':
        return {
          title: 'Processing...',
          desc: 'Waiting for your transaction to be confirmed on the Celo network.',
          icon: <Loader2 className="animate-spin text-celo-green" size={48} />,
          color: 'var(--celo-green)'
        };
      case 'success':
        return {
          title: 'Success!',
          desc: 'Your activity has been recorded on-chain successfully.',
          icon: <CheckCircle2 className="text-celo-green" size={48} />,
          color: 'var(--celo-green)'
        };
      case 'error':
        return {
          title: 'Transaction Failed',
          desc: error || 'Something went wrong while processing your request.',
          icon: <XCircle className="text-red-500" size={48} />,
          color: '#ff4d4d'
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={status === 'success' || status === 'error' ? onClose : undefined}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '360px',
            padding: '40px 24px',
            borderRadius: '32px',
            textAlign: 'center',
            border: `1px solid ${content.color}33`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 20px ${content.color}11`
          }}
        >
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
            {content.icon}
          </div>

          {(status === 'wallet' || status === 'mining') && (
            <div style={{ width: '100px', height: '2px', background: 'rgba(255,255,255,0.1)', margin: '-12px auto 24px', borderRadius: '1px', overflow: 'hidden' }}>
              <motion.div 
                animate={{ x: [-100, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ width: '100%', height: '100%', background: content.color }}
              />
            </div>
          )}
          
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>{content.title}</h2>
          <p style={{ fontSize: '15px', opacity: 0.7, lineHeight: '1.6', marginBottom: '32px' }}>{content.desc}</p>
          
          {hash && (
            <a 
              href={`https://celoscan.io/tx/${hash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                color: 'var(--celo-green)', fontSize: '13px', textDecoration: 'none', marginBottom: '24px',
                fontWeight: '600'
              }}
            >
              View on Celoscan <ExternalLink size={14} />
            </a>
          )}

          {(status === 'success' || status === 'error') && (
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ background: content.color, color: status === 'error' ? '#fff' : '#000' }}
            >
              {status === 'error' ? 'Close' : 'Awesome!'}
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

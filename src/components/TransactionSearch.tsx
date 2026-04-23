import React from 'react';
import { Search } from 'lucide-react';

interface TransactionSearchProps {
  onSearch: (query: string) => void;
}

export const TransactionSearch: React.FC<TransactionSearchProps> = ({ onSearch }) => {
  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <Search 
        size={16} 
        style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} 
      />
      <input 
        type="text" 
        placeholder="Search activities..." 
        onChange={(e) => onSearch(e.target.value)}
        style={{ 
          width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '14px 14px 14px 44px', color: '#fff', fontSize: '14px',
          outline: 'none', transition: 'var(--transition)'
        }}
        onFocus={(e) => e.target.style.borderColor = 'rgba(53, 208, 127, 0.3)'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
      />
    </div>
  );
};

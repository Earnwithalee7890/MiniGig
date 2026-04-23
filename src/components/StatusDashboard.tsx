import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Award } from 'lucide-react';

interface StatusDashboardProps {
  streak: number;
  xp: number;
  rank: number;
}

export const StatusDashboard: React.FC<StatusDashboardProps> = ({ streak, xp, rank }) => {
  return (
    <div className="status-dashboard premium-card glass">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <motion.div whileHover={{ y: -5 }} style={{ textAlign: 'center' }}>
          <div className="task-icon" style={{ margin: '0 auto 8px', background: 'rgba(53, 208, 127, 0.1)', color: 'var(--celo-green)' }}>
            <Zap size={18} />
          </div>
          <div style={{ fontSize: '18px', fontWeight: '900' }}>{streak}d</div>
          <div style={{ fontSize: '10px', opacity: 0.5 }}>STREAK</div>
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} style={{ textAlign: 'center' }}>
          <div className="task-icon" style={{ margin: '0 auto 8px', background: 'rgba(251, 204, 92, 0.1)', color: 'var(--celo-gold)' }}>
            <Award size={18} />
          </div>
          <div style={{ fontSize: '18px', fontWeight: '900' }}>{xp}</div>
          <div style={{ fontSize: '10px', opacity: 0.5 }}>TOTAL XP</div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} style={{ textAlign: 'center' }}>
          <div className="task-icon" style={{ margin: '0 auto 8px', background: 'rgba(255, 255, 255, 0.05)', color: '#fff' }}>
            <Shield size={18} />
          </div>
          <div style={{ fontSize: '18px', fontWeight: '900' }}>#{rank}</div>
          <div style={{ fontSize: '10px', opacity: 0.5 }}>GLOBAL</div>
        </motion.div>
      </div>
    </div>
  );
};

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onClick: (id: string) => void;
}

export const TaskItem = ({ task, onClick }: TaskItemProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.06)' }}
      whileTap={{ scale: 0.98 }}
      className="task-item glass"
      onClick={() => onClick(task.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="task-icon" style={{ 
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))', 
        color: '#fff', 
        border: '1px solid rgba(255,255,255,0.1)' 
      }}>
        {task.icon}
      </div>
      <div className="task-content" style={{ flex: 1 }}>
        <h3 style={{ fontSize: '15px', fontWeight: '600', letterSpacing: '-0.01em' }}>{task.title}</h3>
        <span style={{ 
          color: 'var(--celo-green)', 
          fontWeight: '700', 
          fontSize: '11px', 
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {task.reward} Reward
        </span>
      </div>
      <motion.div 
        className="arrow-badge"
        whileHover={{ x: 3 }}
        style={{ padding: '8px', borderRadius: '14px', background: 'rgba(53, 208, 127, 0.1)', color: 'var(--celo-green)', display: 'flex', alignItems: 'center' }}
      >
        <ArrowRight size={16} />
      </motion.div>
    </motion.div>
  );
};

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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="task-item glass"
      onClick={() => onClick(task.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="task-icon float" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
        {task.icon}
      </div>
      <div className="task-content" style={{ flex: 1 }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{task.title}</h3>
        <p style={{ color: 'var(--celo-green)', fontWeight: '700', fontSize: '13px' }}>+{task.reward}</p>
      </div>
      <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(53, 208, 127, 0.1)', color: 'var(--celo-green)' }}>
        <ArrowRight size={18} />
      </div>
    </motion.div>
  );
};

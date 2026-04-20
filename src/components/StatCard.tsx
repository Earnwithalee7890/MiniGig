import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

export const StatCard = ({ label, value, icon, className = '' }: StatCardProps) => {
  return (
    <div className={`stat-card glass ${className}`}>
      {icon && <div className="stat-icon">{icon}</div>}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
};

import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <main className={cn("layout-container", className)}>
      <div className="content-wrapper">
        {children}
      </div>
    </main>
  )
}

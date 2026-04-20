import React from 'react'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="layout-container">
      <div className="content-wrapper">
        {children}
      </div>
    </main>
  )
}

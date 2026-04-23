import { useState, useMemo, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useReadContract } from 'wagmi'
import { celo } from 'wagmi/chains'
import { Layout } from './components/Layout'
import { TaskItem } from './components/TaskItem'
import { StatCard } from './components/StatCard'
import { Header } from './components/Header'
import { TransactionModal } from './components/TransactionModal'
import { Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MINIGIG_ABI, DAILY_ACTIVITY_ABI } from './constants/abi'
import { CONTRACT_ADDRESS, DAILY_ACTIVITY_CONTRACT, AVAILABLE_TASKS, APP_VERSION, SHARE_MESSAGES } from './constants'

import { useMiniPayConnection } from './hooks/useMiniPayConnection'
import { useCeloTransaction } from './hooks/useCeloTransaction'
import { shareContent, formatDate, handleAsyncError } from './utils/helpers'
import { getTaskIcon } from './utils/taskIcons'

/**
 * Note: The MiniPay injection script is included in index.html 
 * to ensure early detection of the MiniPay environment.
 */

function App() {
  const { isConnected, address } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)
  const [activeTab, setActiveTab] = useState<'tasks' | 'stats'>('tasks')
  const [glassMode, setGlassMode] = useState(true)
  const [lastUpdated] = useState<Date>(new Date())
  const { isMiniPay } = useMiniPayConnection()

  const getConnectorIcon = (name: string) => {
    if (name.toLowerCase().includes('metamask')) return '🦊'
    if (name.toLowerCase().includes('okx')) return '⬛'
    if (name.toLowerCase().includes('minipay')) return '💚'
    return '🔌'
  }

  const { data: userStats, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: MINIGIG_ABI,
    functionName: 'getUserStats',
    args: [address as `0x${string}`],
    chainId: celo.id,
    query: { 
      enabled: !!address,
      refetchInterval: 10000 
    }
  })

  const { 
    execute: executeTx, 
    isPending, 
    isWalletPending, 
    isMining, 
    isSuccess, 
    error: txError, 
    hash: txHash,
    clearError: clearTxError 
  } = useCeloTransaction()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [txStatus, setTxStatus] = useState<'wallet' | 'mining' | 'success' | 'error'>('wallet')

  useEffect(() => {
    if (isWalletPending) {
      setTxStatus('wallet')
      setIsModalOpen(true)
    } else if (isMining) {
      setTxStatus('mining')
      setIsModalOpen(true)
    } else if (isSuccess) {
      setTxStatus('success')
      setIsModalOpen(true)
      setTimeout(() => refetch(), 2000)
    } else if (txError) {
      setTxStatus('error')
      setIsModalOpen(true)
    }
  }, [isWalletPending, isMining, isSuccess, txError, refetch])

  const taskItems = useMemo(() => {
    return AVAILABLE_TASKS.map(task => ({
      ...task,
      icon: getTaskIcon(task.type)
    }))
  }, [])

  const handleCheckIn = async () => {
    try {
      await executeTx({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: MINIGIG_ABI,
        functionName: 'checkIn',
      })
    } catch (err) {
      handleAsyncError(err, 'handleCheckIn')
    }
  }

  const handleCompleteGig = async (taskId: string) => {
    // Convert string ID to bytes32 for the contract
    const taskIdBytes = `0x${taskId.padEnd(64, '0')}` as `0x${string}`

    if (taskId.includes('v')) {
      window.open('https://talent.app', '_blank')
      return
    }

    if (taskId === 'hb') {
      try {
        await executeTx({
          address: DAILY_ACTIVITY_CONTRACT as `0x${string}`,
          abi: DAILY_ACTIVITY_ABI,
          functionName: 'heartbeat',
        })
      } catch (err) {
        handleAsyncError(err, 'handleCompleteGig:heartbeat')
      }
      return
    }

    if (taskId.includes('3')) {
      const shared = await shareContent(SHARE_MESSAGES.TITLE, SHARE_MESSAGES.TEXT, SHARE_MESSAGES.URL);
      if (shared) return;
    }

    try {
      await executeTx({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: MINIGIG_ABI,
        functionName: 'completeGig',
        args: [taskIdBytes],
      })
    } catch (err) {
      handleAsyncError(err, 'handleCompleteGig')
    }
  }


  return (
    <Layout>
      <div className="watermark">MINIGIG</div>
      <Header 
        address={address}
        isConnected={isConnected}
        isMiniPay={isMiniPay}
        onConnect={() => setShowConnectors(!showConnectors)}
        onDisconnect={() => disconnect()}
      />

      <AnimatePresence>
        {showConnectors && !isConnected && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            style={{ 
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
              background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(30px)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              borderTopLeftRadius: '32px', borderTopRightRadius: '32px',
              padding: '24px 20px 40px',
              boxShadow: '0 -20px 50px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', margin: '0 auto 24px' }} onClick={() => setShowConnectors(false)} />
            <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Select Wallet</h2>
            <p style={{ fontSize: '14px', opacity: 0.5, marginBottom: '24px' }}>Choose your preferred connection method</p>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {connectors.map((connector) => (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  key={connector.id}
                  onClick={() => {
                    connect({ connector })
                    setShowConnectors(false)
                  }}
                  className="task-item"
                  style={{ 
                    width: '100%', border: '1px solid rgba(255,255,255,0.05)', 
                    textAlign: 'left', cursor: 'pointer', background: 'rgba(255,255,255,0.03)',
                    padding: '20px', borderRadius: '20px'
                  }}
                >
                  <div className="task-icon" style={{ background: '#222', fontSize: '20px' }}>
                    {getConnectorIcon(connector.name)}
                  </div>
                  <div className="task-content">
                    <h3 style={{ fontSize: '16px' }}>{connector.name}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {connectError && (
              <p style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '16px', textAlign: 'center' }}>
                {connectError.message}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showConnectors && !isConnected && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setShowConnectors(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 90, backdropFilter: 'blur(4px)' }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'tasks' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === 'tasks' ? 20 : -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {activeTab === 'tasks' ? (
            <>
              {isConnected && (
                <div className="stats-grid" style={{ marginBottom: '24px' }}>
                  <StatCard 
                    label="Total Gigs" 
                    value={userStats ? Number((userStats as any)[2]) : 0} 
                  />
                  <StatCard 
                    label="Streak" 
                    value={`${userStats ? Number((userStats as any)[1]) : 0}d`} 
                  />
                </div>
              )}

              {!userStats && isConnected && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="premium-card glass card-glow" 
                  style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(53, 208, 127, 0.05), transparent)' }}
                >
                  <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>🚀 Welcome to MiniGig!</h3>
                  <p style={{ fontSize: '12px', opacity: 0.6 }}>
                    New here? Start by performing your **Daily Check-in** to secure your first 10 XP and start your streak.
                  </p>
                </motion.div>
              )}
              
              <div className="premium-card pulse glass">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: '800' }}>Daily XP</h2>
                    <p style={{ opacity: 0.7, fontSize: '14px', margin: '4px 0 20px' }}>
                      Maintain your streak for 2X rewards.
                    </p>
                  </div>
                  <div className="task-icon" style={{ background: 'var(--celo-gold)', color: '#000' }}>
                    <Zap size={20} />
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  onClick={handleCheckIn}
                  disabled={isPending || !isConnected}
                >
                  {isPending ? 'Processing...' : 'Check-In Now'}
                </button>
              </div>
              <div style={{ marginTop: '32px', paddingBottom: '100px' }}>
                <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '800' }}>Available Gigs</h2>
                {taskItems.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task as any} 
                    onClick={handleCompleteGig} 
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="stats-view" style={{ paddingBottom: '100px' }}>
              <div className="premium-card glass" style={{ textAlign: 'center', background: 'linear-gradient(180deg, rgba(251, 204, 92, 0.1), transparent)' }}>
                <div className="task-icon float" style={{ margin: '0 auto 16px', width: '64px', height: '64px', background: 'var(--celo-gold)', fontSize: '32px' }}>
                  🏆
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Leaderboard</h2>
                <p style={{ opacity: 0.6, fontSize: '14px' }}>Top active gig workers on Celo</p>
                <p style={{ opacity: 0.3, fontSize: '10px', marginTop: '4px' }}>
                  Updated: {lastUpdated.toLocaleTimeString()}
                </p>
                
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--celo-gold)' }}>#{userStats ? '128' : '--'}</div>
                    <div style={{ fontSize: '12px', opacity: 0.5 }}>Your Rank</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', opacity: 0.5 }}>Last Check-in</div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
                      {userStats ? formatDate(Number((userStats as any)[0])) : '--'}
                    </div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--celo-green)' }}>{userStats ? Number((userStats as any)[3]) : 0}</div>
                    <div style={{ fontSize: '12px', opacity: 0.5 }}>XP Earned</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Live Ranking</h2>
                  <div className="pulse-dot" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', opacity: 0.5 }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--celo-green)', borderRadius: '50%' }}></div>
                    LIVE
                  </div>
                </div>
                {[1, 2, 3].map(rank => (
                  <div key={rank} className="task-item glass" style={{ background: rank === 1 ? 'rgba(251, 204, 92, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}>
                    <div className="task-icon" style={{ 
                      background: rank === 1 ? 'var(--celo-gold)' : rank === 2 ? '#E5E4E2' : '#CD7F32', 
                      color: '#000', 
                      fontSize: '18px',
                      boxShadow: rank === 1 ? '0 0 15px var(--celo-gold)' : 'none'
                    }}>
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                    </div>
                    <div className="task-content" style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '15px', fontWeight: rank === 1 ? '800' : '500' }}>
                        0x{Math.random().toString(16).slice(2, 6)}...{Math.random().toString(16).slice(2, 6)}
                      </h3>
                      <p>{1500 - rank * 100} XP</p>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--celo-green)' }}>
                      {120 - rank * 10} Gigs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: '#111', border: '1px solid #333', borderRadius: '30px', padding: '6px', display: 'flex', gap: '4px' }}>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={activeTab === 'tasks' ? 'tab-active' : ''}
            style={{ 
              background: activeTab === 'tasks' ? 'var(--celo-green)' : 'transparent',
              color: activeTab === 'tasks' ? '#000' : '#fff',
              border: 'none', padding: '8px 24px', borderRadius: '25px', fontWeight: 'bold',
              transition: 'var(--transition)'
            }}
          >
            Tasks
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={activeTab === 'stats' ? 'tab-active' : ''}
            style={{ 
              background: activeTab === 'stats' ? 'var(--celo-green)' : 'transparent',
              color: activeTab === 'stats' ? '#000' : '#fff',
              border: 'none', padding: '8px 24px', borderRadius: '25px', fontWeight: 'bold',
              transition: 'var(--transition)'
            }}
          >
            Stats
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', opacity: 0.3, fontSize: '10px', paddingBottom: '120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
          <div className="minipay-indicator"></div>
          <span>Systems Operational • Celo Network</span>
        </div>
        <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <a href={`https://celoscan.io/address/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            Core Contract ↗
          </a>
          <span style={{ opacity: 0.3 }}>•</span>
          <a href={`https://celoscan.io/address/${DAILY_ACTIVITY_CONTRACT}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            Daily Contract ↗
          </a>
        </div>
        <div style={{ marginBottom: '8px' }}>
          POWERED BY <span style={{ color: 'var(--celo-gold)', fontWeight: 'bold' }}>CELO</span>
        </div>
        v{APP_VERSION} • Built for Celo Proof of Ship
        <button 
          onClick={() => copyToClipboard(window.location.href)}
          style={{ 
            background: 'none', border: 'none', color: 'var(--celo-green)', 
            fontSize: '10px', marginLeft: '8px', cursor: 'pointer', opacity: 0.8 
          }}
        >
          Copy App Link 🔗
        </button>
        <div style={{ marginTop: '8px', opacity: 0.5 }}>
          © 2026 MiniGig • Native MiniPay Application
        </div>
      </div>
      <TransactionModal 
        isOpen={isModalOpen}
        status={txStatus}
        error={txError}
        hash={txHash}
        onClose={() => {
          setIsModalOpen(false)
          clearTxError()
        }}
      />
    </Layout>
  )
}

export default App
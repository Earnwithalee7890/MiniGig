import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useSwitchChain, useChainId } from 'wagmi'
import { celo } from 'wagmi/chains'
import { Layout } from './components/Layout'
import { TaskItem } from './components/TaskItem'
import { CheckCircle, Zap, Globe, Share2, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MINIGIG_ABI } from './constants/abi'
import { UserStats } from './types'
import { CONTRACT_ADDRESS, SOCIAL_LINKS } from './constants'

function App() {
  const { isConnected, address } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)
  const [activeTab, setActiveTab] = useState<'tasks' | 'stats'>('tasks')
  const [isMiniPay, setIsMiniPay] = useState(false)

  useEffect(() => {
    // Check for MiniPay
    const checkMiniPay = () => {
      if ((window as any).ethereum?.isMiniPay) {
        setIsMiniPay(true)
        // Automatic connection for MiniPay
        const connector = connectors.find(c => c.id === 'minipay' || (c as any).target === 'metaMask')
        if (connector && !isConnected) {
          connect({ connector })
        }
      }
    }

    checkMiniPay()
    // Also check after a short delay in case of late injection
    const timer = setTimeout(checkMiniPay, 500)
    return () => clearTimeout(timer)
  }, [connect, connectors, isConnected])

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
    query: { enabled: !!address }
  })

  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { writeContract, isPending } = useWriteContract()

  const handleCheckIn = async () => {
    if (chainId !== celo.id && chainId !== 44787) {
      await switchChain({ chainId: celo.id })
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: MINIGIG_ABI,
      functionName: 'checkIn',
      chainId: celo.id,
      type: 'legacy',
    }, {
      onSuccess: () => {
        setTimeout(() => refetch(), 2000)
      }
    })
  }

  const handleCompleteGig = async (taskId: string) => {
    if (chainId !== celo.id && chainId !== 44787) {
      await switchChain({ chainId: celo.id })
      return
    }

    // Convert string ID to bytes32 for the contract
    const taskIdBytes = `0x${taskId.padEnd(64, '0')}` as `0x${string}`

    if (taskId === 'v') {
      window.open('https://talent.app', '_blank')
      return
    }

    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: MINIGIG_ABI,
      functionName: 'completeGig',
      args: [taskIdBytes],
      type: 'legacy',
    }, {
      onSuccess: () => {
        setTimeout(() => refetch(), 2000)
      }
    })
  }

  const tasks = [
    { id: '1', title: 'Daily Check-in', reward: '10 Pts', icon: <CheckCircle className="text-green-500" /> },
    { id: 'v', title: 'Verify Proof of Ship', reward: 'Top Priority', icon: <Zap className="text-yellow-500" /> },
    { id: '2', title: 'Follow on Farcaster', reward: '50 Pts', icon: <Globe className="text-blue-500" /> },
    { id: '3', title: 'Share MiniGig', reward: '30 Pts', icon: <Share2 className="text-pink-500" /> },
  ]

  return (
    <Layout>
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.png" alt="MiniGig Logo" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
          <div>
            <h1 className="gradient-text">MiniGig</h1>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <p style={{ fontSize: '10px', opacity: 0.6, letterSpacing: '1px' }}>CELO PROOF OF SHIP</p>
              <span style={{ fontSize: '10px', borderRadius: '4px', padding: '1px 4px', background: 'rgba(255,255,255,0.1)', color: 'var(--celo-gold)' }}>SOLO</span>
            </div>
            {isMiniPay && (
              <div className="minipay-badge">
                <div style={{ width: '6px', height: '6px', background: 'var(--celo-green)', borderRadius: '50%', boxShadow: '0 0 5px var(--celo-green)' }}></div>
                MiniPay Native
              </div>
            )}
          </div>
        </div>
        {!isConnected ? (
          !isMiniPay && (
            <button onClick={() => setShowConnectors(!showConnectors)} className="btn-primary" style={{ padding: '8px 16px', width: 'auto' }}>
              {showConnectors ? 'Cancel' : 'Enter'}
            </button>
          )
        ) : (
          <div onClick={() => disconnect()} style={{ cursor: 'pointer', fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '12px' }}>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        )}
      </div>

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {activeTab === 'tasks' ? (
            <>
              {isConnected && (
                <div className="stats-grid" style={{ marginBottom: '24px' }}>
                  <div className="stat-card glass">
                    <span>Total Gigs</span>
                    <strong>{userStats ? Number((userStats as UserStats).totalGigs) : 0}</strong>
                  </div>
                  <div className="stat-card glass">
                    <span>Streak</span>
                    <strong>{userStats ? Number((userStats as UserStats).streak) : 0}d</strong>
                  </div>
                </div>
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
                {tasks.map(task => (
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
                
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--celo-gold)' }}>#{userStats ? '128' : '--'}</div>
                    <div style={{ fontSize: '12px', opacity: 0.5 }}>Your Rank</div>
                  </div>
                  <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--celo-green)' }}>{userStats ? Number((userStats as any)[3]) : 0}</div>
                    <div style={{ fontSize: '12px', opacity: 0.5 }}>XP Earned</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <h2 style={{ marginBottom: '16px', fontSize: '18px' }}>Top Performers</h2>
                {[1, 2, 3].map(rank => (
                  <div key={rank} className="task-item glass" style={{ background: rank === 1 ? 'rgba(251, 204, 92, 0.05)' : 'rgba(255, 255, 255, 0.02)' }}>
                    <div className="task-icon" style={{ background: rank === 1 ? 'var(--celo-gold)' : rank === 2 ? '#C0C0C0' : '#CD7F32', color: '#000', fontSize: '14px' }}>
                      {rank}
                    </div>
                    <div className="task-content" style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '15px' }}>0x{Math.random().toString(16).slice(2, 6)}...{Math.random().toString(16).slice(2, 6)}</h3>
                      <p>1,240 XP</p>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
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
            style={{ 
              background: activeTab === 'tasks' ? 'var(--celo-green)' : 'transparent',
              color: activeTab === 'tasks' ? '#000' : '#fff',
              border: 'none', padding: '8px 24px', borderRadius: '25px', fontWeight: 'bold'
            }}
          >
            Tasks
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            style={{ 
              background: activeTab === 'stats' ? 'var(--celo-green)' : 'transparent',
              color: activeTab === 'stats' ? '#000' : '#fff',
              border: 'none', padding: '8px 24px', borderRadius: '25px', fontWeight: 'bold'
            }}
          >
            Stats
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default App

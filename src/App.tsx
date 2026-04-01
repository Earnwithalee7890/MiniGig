import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useSwitchChain, useChainId } from 'wagmi'
import { celo } from 'wagmi/chains'
import { Layout } from './components/Layout'
import { CheckCircle, Zap, Globe, Share2, Award, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Placeholder ABI until compilation finishes
const MINIGIG_ABI = [
  {"inputs":[],"name":"checkIn","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserStats",
    "outputs": [
      {"internalType": "uint256", "name": "lastCheckIn", "type": "uint256"},
      {"internalType": "uint256", "name": "streak", "type": "uint256"},
      {"internalType": "uint256", "name": "totalGigs", "type": "uint256"},
      {"internalType": "uint256", "name": "rewards", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {"inputs":[{"internalType":"bytes32","name":"taskId","type":"bytes32"}],"name":"completeGig","outputs":[],"stateMutability":"nonpayable","type":"function"}
]

const CONTRACT_ADDRESS = '0xE7B16C2E34Fc3a347e3243FBEb3518830AfE647b'

function App() {
  const { isConnected, address } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)
  const [activeTab, setActiveTab] = useState<'tasks' | 'stats'>('tasks')

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
    if (chainId !== celo.id) {
      await switchChain({ chainId: celo.id })
      return // Wait for user to switch and click again
    }

    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: MINIGIG_ABI,
      functionName: 'checkIn',
      chainId: celo.id,
    }, {
      onSuccess: () => refetch()
    })
  }

  const tasks = [
    { id: '1', title: 'Daily Check-in', reward: '10 Pts', icon: <CheckCircle className="text-green-500" /> },
    { id: '2', title: 'Follow on Farcaster', reward: '50 Pts', icon: <Globe className="text-blue-500" /> },
    { id: '3', title: 'Share MiniGig', reward: '30 Pts', icon: <Share2 className="text-pink-500" /> },
    { id: '4', title: 'Invite Friend', reward: '100 Pts', icon: <Award className="text-yellow-500" /> },
  ]

  return (
    <Layout>
      <div className="header">
        <div>
          <h1 className="gradient-text">MiniGig</h1>
          <p style={{ fontSize: '12px', opacity: 0.6 }}>CELO PROOF OF SHIP</p>
        </div>
        {!isConnected ? (
          <button onClick={() => setShowConnectors(!showConnectors)} className="btn-primary" style={{ padding: '8px 16px', width: 'auto' }}>
            {showConnectors ? 'Cancel' : 'Enter'}
          </button>
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
          {isConnected && (
            <div className="stats-grid" style={{ marginBottom: '24px' }}>
              <div className="stat-card">
                <span>Total Gigs</span>
                <strong>{userStats ? Number((userStats as any)[2]) : 0}</strong>
              </div>
              <div className="stat-card">
                <span>Streak</span>
                <strong>{userStats ? Number((userStats as any)[1]) : 0}d</strong>
              </div>
            </div>
          )}

          <div className="premium-card pulse">
            <h2>Claim Daily XP</h2>
            <p style={{ opacity: 0.7, fontSize: '14px', margin: '8px 0 20px' }}>
              Keep your streak alive to rank higher on the leaderboard.
            </p>
            <button 
              className="btn-primary" 
              onClick={handleCheckIn}
              disabled={isPending || !isConnected}
            >
              <Zap style={{ marginRight: '8px' }} />
              {isPending ? 'Processing...' : 'Check-In Now'}
            </button>
          </div>

          <div style={{ marginTop: '32px' }}>
            <h2 style={{ marginBottom: '16px' }}>Available Gigs</h2>
            {tasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-icon float" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}>
                  {task.icon}
                </div>
                <div className="task-content" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{task.title}</h3>
                  <p style={{ color: 'var(--celo-green)', fontWeight: '500' }}>+{task.reward}</p>
                </div>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }}>
                  <ArrowRight size={18} style={{ opacity: 0.5 }} />
                </div>
              </div>
            ))}
          </div>
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

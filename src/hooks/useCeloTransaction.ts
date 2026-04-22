import { useAccount, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { celo } from 'wagmi/chains';
import { useCallback, useState, useEffect } from 'react';

export const useCeloTransaction = () => {
  const { chainId } = useAccount(); // Use chainId from useAccount for better accuracy
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, data: hash, isPending: isWalletPending, error: walletError, reset } = useWriteContract();
  
  const { isLoading: isMining, isSuccess, error: confirmError } = useWaitForTransactionReceipt({
    hash,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (walletError) {
      // Clean up common error messages for the user
      const msg = walletError.message;
      if (msg.includes('User rejected')) setError('Transaction cancelled by user');
      else if (msg.includes('Chain mismatch')) setError('Please ensure your wallet is set to Celo network');
      else setError(msg);
    }
    if (confirmError) setError(confirmError.message);
  }, [walletError, confirmError]);

  const execute = useCallback(async (config: any) => {
    setError(null);
    try {
      // Check if we need to switch
      if (chainId !== celo.id) {
        try {
          await switchChainAsync({ chainId: celo.id });
          // Wait longer for mobile wallets to sync
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (switchError: any) {
          console.warn('Chain switch failed:', switchError);
        }
      }

      // Remove explicit chainId and legacy type from the write call
      // This lets the wallet provider use its current chain, 
      // avoiding the strict 'Chain Mismatch' check in viem.
      const { type, chainId: _, ...restConfig } = config;

      return await writeContractAsync({
        ...restConfig,
        // Omit chainId here to avoid strict viem mismatch check
      });
    } catch (err: any) {
      console.error('Transaction failed:', err);
      setError(err.message || 'Transaction failed');
      throw err;
    }
  }, [chainId, switchChainAsync, writeContractAsync]);

  const clearError = () => {
    setError(null);
    reset();
  };

  return { 
    execute, 
    isPending: isWalletPending || isMining,
    isWalletPending,
    isMining,
    isSuccess,
    error,
    hash,
    clearError
  };
};

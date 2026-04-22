import { useChainId, useSwitchChain, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { celo } from 'wagmi/chains';
import { useCallback, useState, useEffect } from 'react';

export const useCeloTransaction = () => {
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, data: hash, isPending: isWalletPending, error: walletError, reset } = useWriteContract();
  
  const { isLoading: isMining, isSuccess, error: confirmError } = useWaitForTransactionReceipt({
    hash,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (walletError) setError(walletError.message);
    if (confirmError) setError(confirmError.message);
  }, [walletError, confirmError]);

  const execute = useCallback(async (config: any) => {
    setError(null);
    try {
      // Get the latest chain ID directly to avoid closure issues
      if (chainId !== celo.id) {
        try {
          await switchChainAsync({ chainId: celo.id });
          // Give the wallet a moment to sync its internal state after switching
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (switchError: any) {
          console.warn('Chain switch failed or cancelled:', switchError);
          // If the user cancelled the switch, we shouldn't proceed
          if (switchError.code === 4001) throw new Error('Please switch to Celo network to continue');
        }
      }

      // Remove legacy type if present
      const { type, ...restConfig } = config;

      return await writeContractAsync({
        ...restConfig,
        // We still pass chainId to be explicit, but now we've waited for the switch
        chainId: celo.id,
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

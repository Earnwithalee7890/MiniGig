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
      if (chainId !== celo.id) {
        await switchChainAsync({ chainId: celo.id });
      }

      // Remove legacy type if present to let wagmi decide
      const { type, ...restConfig } = config;

      return await writeContractAsync({
        ...restConfig,
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

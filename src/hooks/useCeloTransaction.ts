import { useChainId, useSwitchChain, useWriteContract } from 'wagmi';
import { celo } from 'wagmi/chains';
import { useCallback } from 'react';

export const useCeloTransaction = () => {
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, isPending } = useWriteContract();

  const execute = useCallback(async (config: any) => {
    try {
      if (chainId !== celo.id) {
        await switchChainAsync({ chainId: celo.id });
        // After switching, the next execution might still see the old chainId 
        // due to closure, but writeContractAsync usually handles it if the provider switched.
      }

      return await writeContractAsync({
        ...config,
        chainId: celo.id,
      });
    } catch (err) {
      console.error('Transaction failed:', err);
      throw err;
    }
  }, [chainId, switchChainAsync, writeContractAsync]);

  return { execute, isPending };
};

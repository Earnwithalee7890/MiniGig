import { describe, it, expect } from 'vitest';
import { MiniGigSDK } from './index';

describe('MiniGigSDK', () => {
  it('should initialize correctly', () => {
    const sdk = new MiniGigSDK();
    expect(sdk).toBeDefined();
  });

  it('should have correct default RPC URL', () => {
    const sdk = new MiniGigSDK();
    expect(sdk['client'].transport.url).toBe('https://forno.celo.org');
  });

  it('should allow custom RPC URL', () => {
    const customRpc = 'https://alfajores-forno.celo-testnet.org';
    const sdk = new MiniGigSDK(customRpc);
    expect(sdk['client'].transport.url).toBe(customRpc);
  });
});

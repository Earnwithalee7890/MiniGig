import { describe, it, expect } from 'vitest';
import { MiniGigSDK } from './index';

describe('MiniGigSDK', () => {
  it('should initialize correctly', () => {
    const sdk = new MiniGigSDK();
    expect(sdk).toBeDefined();
  });
});

import { shortenAddress, formatDate, isCeloNetwork } from '../src/utils/helpers';

describe('helpers', () => {
  test('shortenAddress should truncate address correctly', () => {
    const addr = '0x1234567890123456789012345678901234567890';
    expect(shortenAddress(addr, 4)).toBe('0x1234...7890');
  });

  test('formatDate should return Never for 0', () => {
    expect(formatDate(0)).toBe('Never');
  });

  test('isCeloNetwork should return true for 42220', () => {
    expect(isCeloNetwork(42220)).toBe(true);
    expect(isCeloNetwork(1)).toBe(false);
  });
});

import { isAddress, Address } from 'viem';

/**
 * Validates a Celo/Ethereum address
 * @param address The address to validate
 * @returns True if valid, false otherwise
 */
export function isValidAddress(address: string): address is Address {
  return isAddress(address);
}

/**
 * Formats an address for display (0x1234...5678)
 * @param address The address to format
 * @returns The truncated address string
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

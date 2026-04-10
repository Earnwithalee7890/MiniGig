/**
 * Formats an Ethereum address to a shorter version (e.g., 0x1234...5678)
 * @param address The full address string
 * @returns Formatted address string
 */
export const formatAddress = (address?: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

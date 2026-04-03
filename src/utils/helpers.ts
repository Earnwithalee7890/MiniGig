/**
 * Shrinks an Ethereum address for display.
 * @param address - Address to shorten.
 * @param chars - Number of characters to show at start/end.
 * @returns Shortened address string.
 */
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
};

/**
 * Format timestamp into simple date string.
 * @param timestamp - Unix timestamp.
 * @returns Formatted date string.
 */
export const formatDate = (timestamp: number): string => {
  if (timestamp === 0) return 'Never';
  return new Date(timestamp * 1000).toLocaleDateString();
};

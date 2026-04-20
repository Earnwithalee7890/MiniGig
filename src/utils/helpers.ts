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
/**
 * Simple copy-to-clipboard utility.
 * @param text - Text to copy.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
};

/**
 * Share utility using Web Share API.
 * @param title - Share title.
 * @param text - Share text.
 * @param url - URL to share.
 */
export const shareContent = async (title: string, text: string, url: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (err) {
      console.error("Error sharing:", err);
      return false;
    }
  }
  return false;
};

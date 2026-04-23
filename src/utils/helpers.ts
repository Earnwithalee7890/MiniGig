/**
 * Shortens an Ethereum address for display purposes.
 * @param address - The full Ethereum address (e.g., 0x123...abc).
 * @param chars - The number of characters to show at the beginning and end.
 * @returns A shortened version of the address (e.g., 0x1234...abcd).
 */
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
};

/**
 * Formats a Unix timestamp into a human-readable date string.
 * @param timestamp - The Unix timestamp (in seconds).
 * @returns A formatted date string (e.g., "1/1/2024") or "Never" if 0.
 */
export const formatDate = (timestamp: number): string => {
  if (timestamp === 0) return 'Never';
  return new Date(timestamp * 1000).toLocaleDateString();
};

/**
 * Copies a string of text to the user's clipboard.
 * Supports both modern Clipboard API and legacy execCommand fallback.
 * @param text - The text to be copied.
 * @returns A promise that resolves to true if successful, false otherwise.
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
 * Shares content using the native Web Share API.
 * @param title - The title of the content to share.
 * @param text - The descriptive text to share.
 * @param url - The URL to share.
 * @returns A promise that resolves to true if the share was successful.
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

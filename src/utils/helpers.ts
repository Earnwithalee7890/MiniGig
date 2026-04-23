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
 * @param textToCopy - The text to be copied.
 * @returns A promise that resolves to true if successful, false otherwise.
 */
export const copyToClipboard = async (textToCopy: string): Promise<boolean> => {
  try {
    const isSecure = window.isSecureContext;
    if (navigator.clipboard && isSecure) {
      await navigator.clipboard.writeText(textToCopy);
      return true;
    } else {
      const hiddenTextArea = document.createElement("textarea");
      hiddenTextArea.value = textToCopy;
      hiddenTextArea.style.position = "fixed";
      hiddenTextArea.style.left = "-9999px";
      hiddenTextArea.style.top = "0";
      document.body.appendChild(hiddenTextArea);
      hiddenTextArea.focus();
      hiddenTextArea.select();
      const isSuccessful = document.execCommand('copy');
      hiddenTextArea.remove();
      return isSuccessful;
    }
  } catch (error) {
    console.error("Failed to copy text: ", error);
    return false;
  }
};

/**
 * Shares content using the native Web Share API.
 * @param shareTitle - The title of the content to share.
 * @param shareDescription - The descriptive text to share.
 * @param shareUrl - The URL to share.
 * @returns A promise that resolves to true if the share was successful.
 */
export const shareContent = async (shareTitle: string, shareDescription: string, shareUrl: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({ title: shareTitle, text: shareDescription, url: shareUrl });
      return true;
    } catch (shareError) {
      console.error("Error sharing content:", shareError);
      return false;
    }
  }
  return false;
};

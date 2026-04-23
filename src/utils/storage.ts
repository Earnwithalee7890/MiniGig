import { TransactionResponse } from '../types';

const TX_HISTORY_KEY = 'minigig_tx_history';

/**
 * Saves a transaction to local storage.
 * @param tx - The transaction response to save.
 */
export const saveTransaction = (tx: TransactionResponse): void => {
  const history = getTransactionHistory();
  const updatedHistory = [tx, ...history].slice(0, 50); // Keep last 50
  localStorage.setItem(TX_HISTORY_KEY, JSON.stringify(updatedHistory));
};

/**
 * Retrieves the transaction history from local storage.
 * @returns An array of TransactionResponse objects.
 */
export const getTransactionHistory = (): TransactionResponse[] => {
  const history = localStorage.getItem(TX_HISTORY_KEY);
  if (!history) return [];
  try {
    return JSON.parse(history);
  } catch (e) {
    return [];
  }
};

/**
 * Clears the transaction history.
 */
export const clearTransactionHistory = (): void => {
  localStorage.removeItem(TX_HISTORY_KEY);
};

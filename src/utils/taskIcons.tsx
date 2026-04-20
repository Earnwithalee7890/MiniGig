import React from 'react';
import { CheckCircle, Zap, Globe, Share2 } from 'lucide-react';

/**
 * Maps task types to their respective icon components.
 * @param type - Task type string.
 * @returns ReactNode icon.
 */
export const getTaskIcon = (type: string) => {
  switch (type) {
    case 'checkin':
      return <CheckCircle className="text-green-500" />;
    case 'external':
      return <Zap className="text-yellow-500" />;
    case 'social':
      return <Globe className="text-blue-500" />;
    default:
      return <Share2 className="text-pink-500" />;
  }
};

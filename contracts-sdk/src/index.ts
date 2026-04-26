import { MINI_GIG_ABI } from './abis/MiniGigCore';
import { DAILY_ACTIVITY_ABI } from './abis/DailyActivity';

export { MINI_GIG_ABI, DAILY_ACTIVITY_ABI };

export const MINI_GIG_CORE_ADDRESS = '0xE7B16C2E34Fc3a347e3243FBEb3518830AfE647b';
export const DAILY_ACTIVITY_ADDRESS = '0x35a0b74Fe0551dAcb731c7262bb79018BAF18fcF';


/**
 * Talent Protocol Integration Metadata
 */
export const TALENT_PROTOCOL_CONFIG = {
  verificationTag: 'talentapp:project_verification',
  scoreEndpoint: 'https://api.talentprotocol.com/api/v1/passports/',
  requirements: [
    'builders-score',
    'verified-identity'
  ]
};

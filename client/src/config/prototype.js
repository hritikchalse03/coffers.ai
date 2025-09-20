// Prototype Mode Configuration
export const PROTOTYPE_AUTH = process.env.VITE_PROTOTYPE_AUTH !== 'false' // Default to true

export const PROTOTYPE_CONFIG = {
  enabled: PROTOTYPE_AUTH,
  requiredFields: ['firstName'],
  storageKeys: {
    auth: 'auth',
    profile: 'profile'
  }
}

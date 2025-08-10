
// Configuration utility for environment-based settings
export const getAppConfig = () => {
  // In a real deployment, these would come from environment variables
  // For now, using sensible defaults with the ability to override
  const isDevelopment = import.meta.env.DEV;
  
  return {
    baseUrl: isDevelopment 
      ? 'http://localhost:8080' 
      : 'https://nutristeward.com',
    maxSubmissionsPerHour: 5, // Rate limiting
    maxTextLength: 1000,
    maxNameLength: 50,
  };
};

export const getReferralLink = (referralCode: string): string => {
  const config = getAppConfig();
  return `${config.baseUrl}/ref/${referralCode}`;
};

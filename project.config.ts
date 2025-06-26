export const config = {
  adminCredentials: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  automationPrefix: process.env.AUTOMATION_PREFIX,
  downloadDirectory: 'resources/downloads/',
  fileHashingAlgorithm: 'sha256',
};

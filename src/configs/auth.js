export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  TokenExpirationTimeout: 'SessionTimeout',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

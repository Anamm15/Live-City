export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default_secret',
  expiresIn: "1h"
};
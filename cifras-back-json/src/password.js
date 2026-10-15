const crypto = require('crypto');

const SALT_BYTES = 16;
const KEY_LENGTH = 64;

function hashPassword(password) {
  const salt = crypto.randomBytes(SALT_BYTES).toString('hex');
  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  const [salt, storedHash] = storedPassword.split(':');
  if (!salt || !storedHash) {
    return false;
  }

  const storedHashBuffer = Buffer.from(storedHash, 'hex');
  const hashBuffer = crypto.scryptSync(password, salt, KEY_LENGTH);

  return (
    storedHashBuffer.length === hashBuffer.length &&
    crypto.timingSafeEqual(storedHashBuffer, hashBuffer)
  );
}

module.exports = { hashPassword, verifyPassword };

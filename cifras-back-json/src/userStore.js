const fs = require('fs');
const path = require('path');

const USERS_FILE_PATH = path.join(__dirname, '..', 'users.json');

function readUsers() {
  if (!fs.existsSync(USERS_FILE_PATH)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(USERS_FILE_PATH, 'utf-8'));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

function findUserByEmail(email) {
  const normalizedEmail = email.toLowerCase();
  return (
    readUsers().find((user) => user.email.toLowerCase() === normalizedEmail) ||
    null
  );
}

function nextUserId(users) {
  return users.reduce((highestId, user) => Math.max(highestId, user.id), 0) + 1;
}

function toPublicUser(user) {
  const { password, ...publicUser } = user;
  return publicUser;
}

module.exports = {
  readUsers,
  saveUsers,
  findUserByEmail,
  nextUserId,
  toPublicUser,
};

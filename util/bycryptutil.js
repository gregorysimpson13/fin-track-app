const bcrypt = require("bcryptjs");
const BCRYPT_SALT_ROUNDS = 10;

function getHash(str) {
  const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
  return bcrypt.hashSync(str, salt, (err, hash) => {
    if (err) throw err;
    return str;
  });
}

function compareHash(data, hashed) {
  return bcrypt.compareSync(data, hashed);
}

module.exports = {
  getHash,
  compareHash
};

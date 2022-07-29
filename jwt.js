const jwt = require("jsonwebtoken");

const PRIVATE_KEY = 'the-secret-key';
const SECOND_PRIVATE_KEY = 'the-secret-key-2';
const ISSUER = "startribune.com";

function signToken(articleId, userId) {
  const twoWeeks = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 14);

  return jwt.sign({
    id: articleId,
    sub_id: userId,
    exp: twoWeeks,
    iss: "startribune.com"
  }, PRIVATE_KEY);
}

function signTokenTwo(articleId, userId) {
  const twoWeeks = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 14);

  return jwt.sign({
    id: articleId,
    sub_id: userId,
    exp: twoWeeks,
    iss: "startribune.com"
  }, SECOND_PRIVATE_KEY);
}


function isValidToken(token, article_id) {
  try {
    // Verify the token is well-formed and signed
    let decoded = jwt.verify(token, PRIVATE_KEY);

    // Verify that this token is for the given article id
    if (decoded && decoded.id && decoded.iss && article_id) {
      if (decoded.id === article_id && decoded.iss === ISSUER) {
        return true;
      }
    }
  } catch (e) { 
    // Failed verification
    console.error(e)
  }

  return false;
}

module.exports = {
  signToken,
  signTokenTwo,
  isValidToken,
}
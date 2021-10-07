function isName(name) {
  return /^[A-Za-z ]+$/.test(name);
}

module.exports = isName;

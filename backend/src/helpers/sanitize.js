// Made by MKCamara
const xss = require('xss');

function sanitizeObject(obj) {
  const out = {};
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      const val = obj[k];
      if (typeof val === 'string') out[k] = xss(val.trim());
      else out[k] = val;
    }
  }
  return out;
}

module.exports = { sanitizeObject };

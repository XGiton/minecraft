
const utils = {
  timestampToString: function (timestamp) {
    const date = new Date(timestamp)
    if (!date.getTime()) {
      return '';
    }
    return `${date.getFullYear()}/${
      utils.padStr(1 + date.getMonth())}/${
      utils.padStr(date.getDate())} ${
      utils.padStr(date.getHours())}:${
      utils.padStr(date.getMinutes())}:${
      utils.padStr(date.getSeconds())}`;
  },

  timestampToDate: function (timestamp) {
    const date = new Date(timestamp);
    if (!date.getTime()) {
      return '';
    }
    return `${date.getFullYear()}/${
      utils.padStr(1 + date.getMonth())}/${
      utils.padStr(date.getDate())}`;
  },

  isString: function (obj) {
    return typeof obj === 'string'
  },

  isArray: function (obj) {
    return ({}).toString.apply(obj) === '[object Array]'
  },

  isEmptyDict: function (obj) {
    for (let k in obj) {
      return false
    }
    return true
  },

  padStr: function (n) {
    return (n < 10) ? `0${n}` : `${n}`
  }
}

export default utils

'use strict';

module.exports = {

  /**
   * 格式化时间
   * @param {Date} time 时间
   * @param {String} format 格式化字符串
   * @return {String} time_str
   */
  formatDate(time, format = 'y-M-d h:m:s') {
    let date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if ((typeof time === 'string')) {
        if ((/^[0-9]+$/.test(time))) {
          // support "1548221490638"
          time = parseInt(time);
        } else {
          // support safari
          // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
          time = time.replace(new RegExp(/-/gm), '/');
        }
      }

      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const weekDay = [ '日', '一', '二', '三', '四', '五', '六' ];
    const time_str = format.replace(/(y|m|d|h|M|s|a)/g, match => {
      let value = formatObj[match];
      if (match === 'a') {
        return weekDay[value];
      }
      if (match && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  },
  keys(s) {
    return Object.keys(s);
  },
};

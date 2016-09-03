'use strict';

function makeFriendlyDates(arr) {
  var start = arr[0],
      end = arr[1];

  function monthNumToName(num) {
    switch (num) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        console.log('wrong number')
    }
  }

  function dayToOrdinal(num) {
    switch (true) {
      case (num === 1 || num === 21 || num === 31):
        return num + 'st';
      case (num >= 4 && num <= 20) || (num >= 24 && num <= 30):
  return num + 'th';
      case (num === 2 || num === 22 || num === 23):
        return num + 'nd';
      case (num === 3):
        return num + 'rd';
      default:
        console.log('wrong number')
    }
  }

  function parser(date) {
    return {
      year: parseInt(date.substr(0, 4), 10),
      month: parseInt(date.substr(5, 2), 10),
      day: parseInt(date.substr(8, 2), 10)
    };
  }

  function difference(start, end) {
    return {
      year: end.year - start.year,
      month: end.month - start.month,
      day: end.day - start.day
    };
  }

  function selectType(diff, begin) {
    var currentYear = new Date().getFullYear();
    var type = '';

    if (diff.year === 0 && diff.month === 0 && diff.day !== 0) {
      type = 'sameMonth';

    } else if ((diff.year === 0 && diff.month > 0 && begin.year !== currentYear) ||
      (diff.year === 1 && diff.month < 0 && begin.year !== currentYear) ||
      (diff.year === 1 && diff.month === 0 && diff.day < 0 && begin.year !== currentYear)) {
      type = 'lessThanYear';

    } else if ((diff.year > 0 && diff.month >= 0 && diff.day > 0) ||
      (diff.year > 1) ||
      (diff.year === 1 && diff.month === 0 && diff.day === 0)) {
      type = 'moreThanYear';

    } else if (diff.year === 0 && diff.month === 0 && diff.day === 0) {
      type = 'beginEqualEnd';

    } else if ((diff.year === 0 && diff.month > 0 && begin.year === currentYear) ||
      (diff.year === 1 && diff.month < 0 && begin.year === currentYear) ||
      (diff.year === 1 && diff.month === 0 && diff.day < 0 && begin.year === currentYear)) {
      type = '2016';
    }
    return type
  }

  function output(begin, end, type) {
    var arr = [];
    var beginString;
    var endString;

    if (type === 'sameMonth') {
      beginString = monthNumToName(begin.month) + ' ' + dayToOrdinal(begin.day);
      endString = dayToOrdinal(end.day);
      arr.push(beginString, endString);

    } else if (type === 'lessThanYear') {
      beginString = monthNumToName(begin.month) + ' ' + dayToOrdinal(begin.day) + ', ' + begin.year;
      endString = monthNumToName(end.month) + ' ' + dayToOrdinal(end.day);
      arr.push(beginString, endString);

    } else if (type === 'moreThanYear') {
      beginString = monthNumToName(begin.month) + ' ' + dayToOrdinal(begin.day) + ', ' + begin.year;
      endString = monthNumToName(end.month) + ' ' + dayToOrdinal(end.day) + ', ' + end.year;
      arr.push(beginString, endString);

    } else if (type === 'beginEqualEnd') {
      beginString = monthNumToName(begin.month) + ' ' + dayToOrdinal(begin.day) + ', ' + begin.year;
      arr.push(beginString);

    } else if (type === '2016') {
      beginString = monthNumToName(begin.month) + ' ' + dayToOrdinal(begin.day);
      endString = monthNumToName(end.month) + ' ' + dayToOrdinal(end.day);
      arr.push(beginString, endString);
    }

    return arr
  }

  var type = selectType(difference(parser(start), parser(end)), parser(start));

  return output(parser(start), parser(end), type)
}

makeFriendlyDates(["2016-07-01", "2016-07-04"]);

// ["2016-12-01", "2017-02-03"] -> ["December 1st","February 3rd"]
// ["2022-09-05", "2023-09-04"] -> ["September 5th, 2022","September 4th"]
// ["2016-07-01", "2016-07-04"] -> ["July 1st","4th"]
// ["2016-12-01", "2018-02-03"] -> ["December 1st, 2016","February 3rd, 2018"]
// ["2017-03-01", "2017-05-05"] -> ["March 1st, 2017","May 5th"]
// ["2022-09-05", "2023-09-05"] -> ["September 5th, 2022","September 5th, 2023"]
// ["2018-01-13", "2018-01-13"] -> ["January 13th, 2018"]

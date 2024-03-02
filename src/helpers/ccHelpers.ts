// Copied from: https://raw.githubusercontent.com/aaronglang/MagStripeJS/master/src/parsers.js

export type MagStripData = Partial<{
  first_name: string;
  last_name: string;
  license_number: string;
  card_number: number;
  under_21: boolean;
  under_18: boolean;
  expired: boolean;
  age: number;
  date_of_birth: string;
  expiration_date: string;
}>;

/**
 * Parses data from magnetic stripe on most cards containing track 1,2,3 type data
 * @param {string} str
 * @return {MagStripData|null}
 */
export const parseMagStripString = (str: string): MagStripData | null => {
  if (typeof str !== 'string') return null;
  let regexp =
    /((?<=%b)\d+(?=\^))|((?<=\^)[\w\/\s]+(?=\^))|((?<=[=\^])\d{4})/gi;
  let matches = str.match(regexp);
  if (matches && matches.length > 2) {
    return map_card_data(matches);
  } else {
    return null;
  }
};

/**
 * Gets the delta in days from date_1 to date_2
 * @param {Date} date_1
 * @param {Date} date_2
 * @return {number}
 */
const date_diff_days = (date_1: Date, date_2: Date) => {
  // get time diff
  let time_diff = date_2.getTime() - date_1.getTime();
  // return diff in days
  return Math.ceil(time_diff / (1000 * 3600 * 24));
};

/**
 * Gets the delta in years from date_1 to date_2
 * @param {Date} date_1
 * @param {Date} date_2
 * @return {number}
 */
const date_diff_years = (date_1: Date, date_2: Date) => {
  // get time diff
  let time_diff = Math.abs(date_2.getTime() - date_1.getTime());
  // return diff in days
  return Math.floor(time_diff / (1000 * 3600 * 24) / 365.25);
};

/**
 * Iterates through array of matches from credit card string
 * @param {array} matches
 * @return {MagStripData}
 */
const map_card_data = (matches: string[]) => {
  let obj: MagStripData = {};
  matches.map((x) => {
    if (/[\sa-z]+\/[\sa-z]+/gi.test(x)) {
      // get name
      let y = x.trim().split('/');
      obj.first_name = y[1].trim().toLowerCase();
      obj.last_name = y[0].trim().toLowerCase();
    } else if (/^\d{16,20}$/.test(x)) {
      // get card number
      obj.card_number = +x.trim();
    } else if (/^\d{4}/gi.test(x)) {
      // check expiration
      let exp_data = check_card_expiration(x);
      Object.assign(obj, exp_data);
    }
  });
  return obj;
};

/**
 * Gets the expiration date/status from credit card data
 * @param {string} str
 * @return {object}
 */
const check_card_expiration = (str: string): MagStripData => {
  let obj: MagStripData = {};
  obj.expiration_date = str.trim().match(/\d{2}/g)?.reverse().join('/');
  let now = new Date();
  if (!obj.expiration_date) return obj;

  let expiration_date = new Date(
    +`20${obj.expiration_date.substr(3, 2)}`,
    +obj.expiration_date.substr(0, 2) - 1
  );
  let expired = date_diff_days(expiration_date, now);
  obj.expired = !!(expired > 0);
  return obj;
};

import escapeStringRegexp from 'escape-string-regexp';

/**
 * Given a text to be used in as a regexp pattern and
 * a value to match against it, it escapes special
 * chars from the regexpValue and returns if the
 * regexp matches the value.
 * @param searchText
 * @param valueToTest
 */
export const matchString = (searchText: string, valueToTest: string): boolean => {
  const escapedString = escapeStringRegexp(searchText);
  return new RegExp(escapedString, 'gi').test(valueToTest);
};

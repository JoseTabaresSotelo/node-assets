import * as _ from 'lodash';

// Iterative function that convert object properties in camel case format
export const camelize = <T>(obj: T) =>
    _.transform(obj, (acc: T, value, key, target) => {
      const camelKey = _.isArray(target) ? key : _.camelCase(key);
  
      acc[camelKey] = _.isObject(value) && !(value instanceof Date) ? camelize(value) : value;
    });
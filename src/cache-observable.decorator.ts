import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/refCount';
import 'rxjs/add/operator/take';

/**
 * Cache for observable objects
 */
const cache: {
  [index: string]: Observable<any>
} = {};

/**
 * Calc hash of string
 * Source: https://stackoverflow.com/a/7616484
 *
 * @param {string} s
 * @returns {string}
 */
const hashCode = function (s: string): string {
  let hash: number = 0
  let chr: number;
  if (s.length === 0) {
    return hash.toString(36);
  };
  for (let i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash.toString(36);
};


/**
 * Cache Observable function for ms milliseconds
 *
 * @param {number} ms
 * @returns {(target: any, methodName: string, descriptor: PropertyDescriptor) => PropertyDescriptor}
 * @constructor
 */

export default function CacheObservable(ms: number = 1000) {

  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {

    const original = descriptor.value;
    const targetName = target.constructor.name;

    descriptor.value = function (...args) {

      const key = hashCode(`${targetName}:${methodName}:${JSON.stringify(args)}`);

      const entry = cache[key];
      if (entry) {
        return entry;
      }

      cache[key] = original.apply(this, args)
        .publishReplay(1, ms)
        .refCount()
        .take(1);
      return cache[key];
    };
    return descriptor;
  };

}

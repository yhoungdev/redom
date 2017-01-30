import { createElement } from './create-element';
import { parseArguments, isString, isNode } from './util';

const SVG = 'http://www.w3.org/2000/svg';

const svgcache = {};

const memoizeSVG = query => svgcache[query] || createElement(query, SVG);

export function svg (query, ...args) {
  let element;

  if (isString(query)) {
    element = memoizeSVG(query).cloneNode(false);
  } else if (isNode(query)) {
    element = query.cloneNode(false);
  } else {
    throw new Error('At least one argument required');
  }

  parseArguments(element, args);

  return element;
}

svg.extend = function (query) {
  const clone = memoizeSVG(query);

  return svg.bind(this, clone);
};

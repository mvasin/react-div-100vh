export function containsRvh(propertyValue) {
  // TODO: when regexp is lifted up the lexical scope, to be used
  // in both `containsRvh` and `replaceRvhWithPx`, some tests start to
  // fail. Seems like a regexp object contains some weird state that
  // changes after executions; executions interfere with each other.
  // It would be nice to figure out what is the problem exactly.
  const rvhRegex = /(\d+(\.\d*)?)rvh(?!\w)/;
  return rvhRegex.test(propertyValue);
}

function replaceRvhWithPx(propertyStringValue, windowHeight) {
  // regexp is global to make #replace work multiple times
  const rvhRegex = /(\d+(\.\d*)?)rvh(?!\w)/g;
  return propertyStringValue.replace(
    rvhRegex,
    (_, rvh) => `${(windowHeight * parseFloat(rvh)) / 100}px`
  );
}

function throwOnBadArgs(givenStyle, windowHeight) {
  if (typeof givenStyle !== 'object' && givenStyle !== undefined)
    throw Error(`style (the first argument) must be an object or undefined`);
  if (typeof windowHeight !== 'number' || windowHeight < 0)
    throw Error('Second argument (windowHeight) must be a non-negative number');
}

function convertStyle(givenStyle, windowHeight) {
  throwOnBadArgs(givenStyle, windowHeight);

  // If style is not passed, implicit {height: '100rvh'} style is used.
  const defaultStyle = { height: '100rvh' };
  const usedStyle = givenStyle === undefined ? defaultStyle : givenStyle;

  const convertedStyle = {};
  Object.keys(usedStyle).forEach(key => {
    // if a value contains no rvh unit, it's used as is, otherwise converted
    // to px; 1rvh = (window.innerHeight / 100)px
    convertedStyle[key] =
      typeof usedStyle[key] === 'string'
        ? replaceRvhWithPx(usedStyle[key], windowHeight)
        : usedStyle[key];
  });
  return convertedStyle;
}

export default convertStyle;

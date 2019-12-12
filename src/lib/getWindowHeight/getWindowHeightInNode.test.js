/**
 * @jest-environment node
 */

import getWindowHeight from '.';

describe('neither document nor window exists, e.g. server-side rendering', () => {
  it('returns 0', () => {
    const windowHeight = getWindowHeight();
    expect(windowHeight).toEqual(0);
  });
});

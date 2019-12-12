import getWindowHeight from '.';
import { JSDOM } from 'jsdom';

describe('the document exists', () => {
  beforeEach(() => {
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 100);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns document.documentElement.clientHeight', () => {
    const windowHeight = getWindowHeight();
    expect(windowHeight).toEqual(100);
  });
});

describe('the window exists', () => {
  beforeEach(() => {
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => undefined);
    window = Object.assign(window, { document: undefined, innerHeight: 500 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns window.innerHeight', () => {
    const windowHeight = getWindowHeight();
    expect(windowHeight).toEqual(500);
  });
});

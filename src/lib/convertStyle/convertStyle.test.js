import convertStyle, { containsRvh } from './convertStyle';

describe('rvh detection in a CSS property value', () => {
  it('detects a single rvh value', () => {
    expect(containsRvh('100rvh')).toBe(true);
  });

  it('detects multiple rvh values', () => {
    expect(containsRvh('1rvh 1rvh')).toBe(true);
  });

  it('detects a floating point rvh value', () => {
    expect(containsRvh('1.5rvh')).toBe(true);
  });

  it('ignores an invalid rvh units', () => {
    expect(containsRvh('1.5rvhsomething')).toBe(false);
  });

  it('ignores value is separated with rvh unit by space', () => {
    expect(containsRvh('1.5 rvh')).toBe(false);
  });

  it('ignores if rvh value in non-numeric', () => {
    expect(containsRvh('abcrvh')).toBe(false);
  });
});

describe('rvh conversion', () => {
  it('throws if windowHeight is not a non-negative number', () => {
    expect(() => convertStyle({})).toThrow();
    expect(() => convertStyle({}, 'string')).toThrow();
    expect(() => convertStyle({}, -1)).toThrow();
  });

  it('throws if given style is not an object or undefined', () => {
    expect(() => convertStyle(null, 1000)).toThrow();
    expect(() => convertStyle([1, 2, 3], 1000)).toThrow();
    expect(() => convertStyle(undefined, 1000)).not.toThrow();
    expect(() => convertStyle({}, 1000)).not.toThrow();
  });

  it('supports properties with non-string values', () => {
    expect(convertStyle({ lineHeight: 2, height: '50rvh' }, 1000)).toEqual({
      lineHeight: 2,
      height: '500px'
    });
  });

  it('converts rvh to px', () => {
    expect(convertStyle({ height: '100rvh' }, 1000)).toEqual({
      height: '1000px'
    });
  });

  it('converts a floating point rvh to px correctly', () => {
    expect(convertStyle({ height: '50.5rvh' }, 1000)).toEqual({
      height: '505px'
    });
  });

  it('converts an rvh unit to px in a shorthand value', () => {
    expect(convertStyle({ border: '1rvh solid red' }, 1000)).toEqual({
      border: '10px solid red'
    });
  });

  it('converts a value consisting of multiple rvh', () => {
    expect(convertStyle({ margin: '10px 1rvh 20px 1.5rvh' }, 1000)).toEqual({
      margin: '10px 10px 20px 15px'
    });
  });

  it('converts multiple rvh values to px', () => {
    expect(
      convertStyle({ minHeight: '50.5rvh', maxHeight: '100rvh' }, 1000)
    ).toEqual({ minHeight: '505px', maxHeight: '1000px' });
  });

  it('does not change style object if it contains no rvh', () => {
    expect(convertStyle({ height: '50vh', color: 'green' }, 1000)).toEqual({
      height: '50vh',
      color: 'green'
    });
  });
});

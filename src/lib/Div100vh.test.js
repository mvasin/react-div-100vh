import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Div100vh, { parseStylesAndConvertRvhToPx } from './index.jsx'

const renderComponent = props => renderer.create(
  <Div100vh {...props} />,
);

const getDivProps = component => component.root.findByType('div').props;

describe('Rendering and unmounting in the DOM', () => {
  it('should not crash', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Div100vh />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('When component mounts and/or resizes', () => {
  describe('when no props are passed to the component', () => {
    it('should render a <div> with a height value that matches the visible area of the viewport when there are no props passed', () => {
      window.innerHeight = 1;
      const component = renderComponent({});
      const props = getDivProps(component);
      expect(props).toEqual({ style: { height: '1px' } });
    });
  });

  describe('when props are passed to the component', () => {
    describe('when props do not contain a style object', () => {
      it('should render a <div> with all the declared props plus a style.height value that matches the visible area of the viewport', () => {
        window.innerHeight = 1;
        const component = renderComponent({ foo: 'foo', bar: 'bar' });
        const props = getDivProps(component);
        expect(props).toEqual({ foo: 'foo', bar: 'bar', style: { height: '1px' } });
      });
    });

    describe('when props contain a style object', () => {
      describe('when the style object contains no values that use the rvh unit', () => {
        it('should render a <div> with all the declared props plus a style.height value that matches the visible area of the viewport', () => {
          window.innerHeight = 1;
          const component = renderComponent({ foo: 'foo', bar: 'bar', style: { maxHeight: '100%' } });
          const props = getDivProps(component);
          expect(props).toEqual({ foo: 'foo', bar: 'bar', style: { height: '1px', maxHeight: '100%' } });
        });
      });

      describe('when the style object contains values that use the rvh unit', () => {
        it('should render a <div> with all the declared props, and parse the props so that all rvh values are proportionally adjusted to the visible area of the viewport', () => {
          window.innerHeight = 1000;
          const component = renderComponent({ foo: 'foo', bar: 'bar', style: { maxHeight: '99rvh' } });
          const props = getDivProps(component);
          expect(props).toEqual({ foo: 'foo', bar: 'bar', style: { maxHeight: '990px' } });
        });
      });
    });
  });
});

xdescribe('parseStylesAndConvertRvhToPx', () => {
  test('pending', () => {
  });
});

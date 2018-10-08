import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Div100vh from './index.jsx'

const renderComponent = props => renderer.create(
  <Div100vh {...props} />,
);

const getDivProps = component => component.root.findByType('div').props;

describe('Div100vh', () => {
  describe('#render', () => {
    it('renders and unmounts without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Div100vh />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('#computeRvhStyles', () => {
    test('default behavior', () => {
      window.innerHeight = 1;
      const component = renderComponent({});
      const instance = component.getInstance();
      instance.computeRvhStyles();
      const props = getDivProps(component);
      expect(props).toEqual({ style: { height: '1px' } });
    });

    test('when props are passed, but without style', () => {
      window.innerHeight = 1;
      const component = renderComponent({ foo: 'foo', bar: 'bar' });
      const instance = component.getInstance();
      instance.computeRvhStyles();
      const props = getDivProps(component);
      expect(props).toEqual({ foo: 'foo', bar: 'bar', style: { height: '1px' } });
    });

    test('when props are passed with style without the rvh unit', () => {
      window.innerHeight = 1;
      const component = renderComponent({ foo: 'foo', bar: 'bar', style: { maxHeight: '100%' } });
      const instance = component.getInstance();
      instance.computeRvhStyles();
      const props = getDivProps(component);
      expect(props).toEqual({ foo: 'foo', bar: 'bar', style: { height: '1px', maxHeight: '100%' } });
    });

    test('when props are passed with style with the rvh unit', () => {
      window.innerHeight = 1000;
      const component = renderComponent({ foo: 'foo', bar: 'bar', style: { maxHeight: '99rvh' } });
      const instance = component.getInstance();
      instance.computeRvhStyles();
      const props = getDivProps(component);
      expect(props).toEqual({ foo: 'foo', bar: 'bar', style: { maxHeight: '990px' } });
    });
  });
});

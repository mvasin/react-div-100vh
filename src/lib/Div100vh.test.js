import React from 'react';
import ReactDOM from 'react-dom';
import Div100vh from './index.jsx'

describe('Div100vh', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Div100vh />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing when createRef is not supported', () => {
    React.createRef = null;
    const div = document.createElement('div');
    ReactDOM.render(<Div100vh />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import Div100vh from './index.jsx'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Div100vh />, div);
  ReactDOM.unmountComponentAtNode(div);
});

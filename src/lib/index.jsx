import React from 'react';

class Div100vh extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.setHeightAsWindow = this.setHeightAsWindow.bind(this);
  }

  setHeightAsWindow() {
    const node = this.myRef.current;
    node.style.height = window.innerHeight + 'px';
  }

  componentDidMount() {
    this.setHeightAsWindow();
    window.addEventListener('resize', this.setHeightAsWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeightAsWindow);
  }

  render() {
    return <div ref={this.myRef} {...this.props} />;
  }
}

export default Div100vh;
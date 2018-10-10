import React from 'react';

const rvhRegex = /(\d+(\.\d*)?)rvh\s*$/;

class Div100vh extends React.Component {
  state = {
    style: {},
  };

  // On window resize, recalculate any rvh unit style properties
  computeRvhStyles = () => {
    const userDefinedStyle = this.props.style || {};

    const { rvhPropertyFound, style } = Object.entries(userDefinedStyle)
      .reduce(({ rvhPropertyFound, style }, [property, rawValue]) => {
        const match = rvhRegex.exec(rawValue);
        if (match != null) {
          // Guarantee that this only runs for numbers
          const extractedValue = parseFloat(match[0]);
          const parsedValue = extractedValue / 100 * window.innerHeight + 'px';

          return {
            rvhPropertyFound: true,
            style: { ...style, [property]: parsedValue },
          };
        }
        return {
          rvhPropertyFound,
          style: { ...style, [property]: rawValue },
        };
      }, {});

    const updatedStyle = rvhPropertyFound ? style : {
      height: `${window.innerHeight}px`,
      ...style,
    };

    this.setState({ style: updatedStyle });
  }

  componentDidMount() {
    this.computeRvhStyles();
    window.addEventListener('resize', this.computeRvhStyles);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeRvhStyles);
  }

  render() {
    return (
      <div
        {...this.props}
        style={this.state.style}
      />
    );
  }
}

export default Div100vh;

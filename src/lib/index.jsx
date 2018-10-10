import React from 'react';

const rvhRegex = /(\d+(\.\d*)?)rvh\s*$/;

export const parseStylesAndConvertRvhToPx = (rawValue) => {
  const match = rvhRegex.exec(rawValue) || [];
  const parsedMatch = parseFloat(match[0], 10);
  const validRvhProperty = parsedMatch && !Number.isNaN(parsedMatch);
  return {
    validRvhProperty,
    value: validRvhProperty ?
      `${parsedMatch / 100 * window.innerHeight}px` :
      rawValue,
  };
};

class Div100vh extends React.Component {
  state = {
    style: {},
  };

  // On window resize, recalculate any rvh unit style properties
  updateStyle = () => {
    const userDefinedStyle = this.props.style || {};

    const { rvhPropertyFound, style } = Object.entries(userDefinedStyle)
      .reduce(({ rvhPropertyFound, style }, [property, rawValue]) => {
        const { validRvhProperty, value } = parseStylesAndConvertRvhToPx(rawValue);
        return {
          rvhPropertyFound: rvhPropertyFound || validRvhProperty,
          style: { ...style, [property]: value },
        };
      }, {});

    const updatedStyle = rvhPropertyFound ? style : {
      height: `${window.innerHeight}px`,
      ...style,
    };

    this.setState({ style: updatedStyle });
  }

  componentDidMount() {
    this.updateStyle();
    window.addEventListener('resize', this.updateStyle);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateStyle);
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

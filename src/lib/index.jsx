import React from 'react';

const rvhRegex = /(\d+(\.\d*)?)rvh\s*$/;

class Div100vh extends React.Component {
  constructor(props) {
    super(props);
    this.state = { style: { } };
    this.computeRvhStyles = this.computeRvhStyles.bind(this);
  }

  // On window resize, recalculate any rvh unit style properties
  computeRvhStyles() {
    const userDefinedStyle = this.props.style || {
      height: `${window.innerHeight}px`,
    };

    const { rvhPropertyFound, style } = Object.entries(userDefinedStyle)
      .reduce(({ rvhPropertyFound, style }, [property, rawValue]) => {
        const match = rvhRegex.exec(rawValue);
        if (match != null) {
          // Guarantee that this only runs for numbers
          const extractedValue = parseFloat(match[0]);
          const parsedValue = extractedValue / 100 * window.innerHeight + 'px';

          return {
            rvhPropertyFound: true,
            style: Object.assign({}, style, { [property]: parsedValue }),
          };
        }
        return {
          rvhPropertyFound,
          style: Object.assign({}, style, { [property]: rawValue }),
        };
      }, {});

    const updatedStyle = rvhPropertyFound ? style : Object.assign(
      {},
      { height: `${window.innerHeight}px` },
      style,
    );

    this.setState({ style: updatedStyle });
  }

  componentDidMount() {
    this.computeRvhStyles();
    window.addEventListener('resize', this.computeRvhStyles, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeRvhStyles, false);
  }

  render() {
    const { style } = this.state;
    return (
      <div
        {...this.props}
        style={style}
      />
    );
  }
}

export default Div100vh;

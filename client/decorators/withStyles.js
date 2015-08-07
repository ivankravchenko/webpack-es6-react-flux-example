// withStyles decorator to include CSS on a per-component level
// via: https://github.com/kriasoft/react-decorators/blob/master/src/withStyles.js

import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import invariant from 'react/lib/invariant';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';

let count = 0;

function withStyles(styles) {
  // // Only import and decorate if we're running in the browser
  // if (process.env.BROWSER) {
  //   style = require('components/' + stylePath);
  // } else {
  //   // TODO: Otherwise, we should collect all CSS
  //   // and render to the page-level stylesheet to avoid FOUC
  //   console.log("Skipping CSS import");
  //   return (ComposedComponent) => class WithStyles {
  //       render() {
  //           return <ComposedComponent {...this.props} />;
  //       }
  //   }
  // }

  return (ComposedComponent) => class WithStyles {

    static contextTypes = {
      onInsertCss: PropTypes.func
    };

    constructor() {
      this.refCount = 0;
      ComposedComponent.prototype.renderCss = function (css) {
        let style;
        if (canUseDOM) {
          if (this.styleId && (style = document.getElementById(this.styleId))) {
            if ('textContent' in style) {
              style.textContent = css;
            } else {
              style.styleSheet.cssText = css;
            }
          } else {
            this.styleId = `dynamic-css-${count++}`;
            style = document.createElement('style');
            style.setAttribute('id', this.styleId);
            style.setAttribute('type', 'text/css');

            if ('textContent' in style) {
              style.textContent = css;
            } else {
              style.styleSheet.cssText = css;
            }

            document.getElementsByTagName('head')[0].appendChild(style);
            this.refCount++;
          }
        } else {
          this.context.onInsertCss(css);
        }
      }.bind(this);
    }

    componentWillMount() {
      if (canUseDOM) {
        invariant(styles.use, `The style-loader must be configured with reference-counted API.`);
        styles.use();
      } else {
        this.context.onInsertCss(styles.toString());
      }
    }

    componentWillUnmount() {
      styles.unuse();
      if (this.styleId) {
        this.refCount--;
        if (this.refCount < 1) {
          let style = document.getElementById(this.styleId);
          if (style) {
            style.parentNode.removeChild(style);
          }
        }
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  };
}

export default withStyles;

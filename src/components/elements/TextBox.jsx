import React from 'react';
//import styles from './TextBox.css';

class TextBox extends React.Component {

    static propTypes = {
        maxLines: React.PropTypes.number
    };

    static defaultProps = {
        maxLines: 1
    };

    render() {
        return (
        <span className="TextBox">
            {this.props.maxLines > 1 ?
            <textarea {...this.props} className="TextBox-input" ref="input" key="input" rows={this.props.maxLines} /> :
            <input {...this.props} className="TextBox-input" ref="input" key="input" />}
        </span>
        );
    }

}

export default TextBox;

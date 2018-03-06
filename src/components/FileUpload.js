import React, { Component } from 'react';
import { typography } from 'material-ui/styles';
import PropTypes from 'prop-types';

class FileUpload extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <h3 style={styles.imageTitle}>{this.props.title}</h3>
                <input style={styles.inputfile} type="file" onChange={this.props.onUpload} />
            </div>
        );
    }
}
const styles = {
    imageTitle: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        marginBottom: 20,
        marginTop: 15
    }

};

FileUpload.propTypes = {
    title: PropTypes.string,
    onUpload: PropTypes.func
};

export default FileUpload;
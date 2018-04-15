import React, { Component, PropTypes } from 'react';
import { grey800 } from 'material-ui/styles/colors';
import { typography } from 'material-ui/styles';
import { TextField, RaisedButton } from 'material-ui';

class GeneralInfo extends Component {
    

    render() {
      return (
        <div>
            <div style={styles.headerText}>
                INFORMACIÓN GENERAL
            </div>
            <div>
            <TextField
                hintText="Desripción"
                floatingLabelText="Ingrese una descripción de la rutina"
                multiLine={true}
                rows={1}
                fullWidth={true}
                name="description"
                value={this.props.description}
                onChange={this.props.handleInput}
            />
            </div>
            
            <RaisedButton
                    label="Siguiente"
                    primary={true}
                    disabled={!this.props.description}
                    style={styles.raisedButton}
                    value={1}
                    onClick={this.props.nextIndex} />
        </div>
      );
    }
}
const styles = {
    headerText: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        color: grey800
    },
    raisedButton: {
        float: 'right',
    }
};

GeneralInfo.propTypes = {
    description: PropTypes.string,
    handleInput: PropTypes.func,
    nextIndex: PropTypes.func
};

export default GeneralInfo;
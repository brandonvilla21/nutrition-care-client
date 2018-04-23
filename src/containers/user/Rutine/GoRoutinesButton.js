import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router';

const GoRoutinesButton = (props) => {
    return (
        <FlatButton
            label="Ir a mis rutinas"
            primary={true}
            containerElement={<Link to="/my-routines" />}
            onClick={props.goRoutines}
      />
    );
};

GoRoutinesButton.propTypes = {
    goRoutines: PropTypes.func,
};

export default GoRoutinesButton;


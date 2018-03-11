import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider/Divider';

const ProgressInfo = (props) => {
    const styles = {
        filedContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 5,
            marginBottom: 5,
        }    
    };

    return (
        <div>
            <div style={styles.filedContainer}>
            <div>
                <strong>{props.infoName}: </strong>
            </div>
            <div>
                {props.infoResult}
            </div>
        </div>
        <Divider />
     </div>
     
    );
};

ProgressInfo.propTypes = {
    infoName: PropTypes.string,
    infoResult: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
};

export default ProgressInfo;

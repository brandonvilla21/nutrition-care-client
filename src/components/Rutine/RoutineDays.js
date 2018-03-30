import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class RoutineDays extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
            <Collapsible style={styles.collapsible} trigger="LUNES">
                <p>Well it worked</p>
                <p>Well it worked</p>
            </Collapsible>      
        </div>
      );
    }
}
const styles = {
    collapsible: {
        backgroundColor: 'blue'
    }
};

export default RoutineDays;
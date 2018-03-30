import React, { Component } from 'react';
import Collapsible from 'react-collapsible'

class RoutineDays extends Component {
    constructor(props) {
        super(props);


    }

    render() {
      return (
        <div>
            <Collapsible trigger="Collapse this bby">
                <p>Well it worked</p>
            </Collapsible>      
        </div>
      )
    }
}
import React, { Component, PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import FitnessCenter from 'material-ui/svg-icons/places/fitness-center';
import CheckCirlce from 'material-ui/svg-icons/action/check-circle';
import GeneralInfo from './GeneralInfo';

class TabsRutine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };

        this.nextIndex = this.nextIndex.bind(this);
    }
    
    nextIndex() {
        const { tabIndex } = this.state;
        this.setState({ tabIndex: tabIndex + 1 });
    }

    prevIndex() {
        const { tabIndex } = this.state;
        this.setState({ tabIndex: tabIndex - 1 });
    }

    render() {
      return (
        <Tabs value={this.state.tabIndex} >
            <Tab
                icon={<InfoOutline />}
                label="Info general"
                value={0}
            >
                <div style={styles.container}>
                    <GeneralInfo
                        description={this.props.description}
                        handleInput={this.props.handleInput}
                        nextIndex={this.nextIndex}
                    />
                </div>
            </Tab>
            <Tab
                icon={<FitnessCenter />}
                label="Mi rutina"
                value={1}
            >
                <div style={styles.container}>
                    
                </div>
            </Tab>
            <Tab
                icon={<CheckCirlce />}
                label="Finalizar"
                value={2}
            >
                <div style={styles.container}>
                    3
                </div>
            </Tab>
        </Tabs>
      );
    }
}
const styles = {
    container: {
        padding: '1rem'
    }
};

TabsRutine.propTypes = {
    description: PropTypes.string,
    handleInput: PropTypes.func
};
export default TabsRutine;
import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import FitnessCenter from 'material-ui/svg-icons/places/fitness-center';
import CheckCirlce from 'material-ui/svg-icons/action/check-circle';
import GeneralInfo from './GeneralInfo';
import MyRoutine from '../../components/Rutine/MyRoutine';
import { blue500 } from 'material-ui/styles/colors';
import RoutineResume from './RoutineResume';

class TabsRoutine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };

        this.nextIndex = this.nextIndex.bind(this);
        this.prevIndex = this.prevIndex.bind(this);
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
                style={styles.tab}
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
                style={styles.tab}
            >
                <div style={styles.container}>
                    <MyRoutine
                        selectedDays={this.props.selectedDays}
                        days={this.props.days}
                        removeDay={this.props.removeDay}
                        removedDay={this.props.removedDay}
                        clearRemovedDay={this.props.clearRemovedDay}
                        addExerciseToDay={this.props.addExerciseToDay}
                        onChangeField={this.props.onChangeField}
                        nextIndex={this.nextIndex}
                        prevIndex={this.prevIndex}
                        
                    />
                </div>
            </Tab>
            <Tab
                icon={<CheckCirlce />}
                label="Finalizar"
                value={2}
                style={styles.tab}
            >
                <div style={styles.container}>
                    <RoutineResume
                        days={this.props.days}
                        onSubmitRoutine={this.props.onSubmitRoutine}
                        prevIndex={this.prevIndex} />
                </div>
            </Tab>
        </Tabs>
        
      );
    }
}
const styles = {
    container: {
        padding: '1rem'
    },
    tab: {
        backgroundColor: blue500,
        inkBarStyle: {
          backgroundColor: 'white'
        }
    },
};

TabsRoutine.propTypes = {
    description: PropTypes.string,
    handleInput: PropTypes.func,
    selectedDays: PropTypes.func,
    days: PropTypes.array,
    removeDay: PropTypes.func,
    removedDay: PropTypes.object,
    clearRemovedDay: PropTypes.func,
    addExerciseToDay: PropTypes.func,
    onChangeField: PropTypes.func,
    onSubmitRoutine: PropTypes.func,
};
export default TabsRoutine;
import React, { Component } from 'react';
import PageBase from '../../../components/PageBase';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import HeightWeight from '../../../components/UserInfo/HeightWeight';
import FatPercentage from '../../../components/UserInfo/FatPercentage';
import UserProgress from '../../../components/UserInfo/UserProgress';
import { Link } from 'react-router';
import Moment from 'react-moment';
import axios from 'axios';
import urlConfig from '../../../url-config';

class GeneralInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            finished: false,
            stepIndex: 0,

            height: '',
            weight: '',
            fatPercentage: '',
            fatKg: '',
            muscleKg: ''
        };
        this.dummyAsync = this.dummyAsync.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    dummyAsync(cb) {
        this.setState({loading: true}, () => {
          this.asyncTimer = setTimeout(cb, 500);
        });
    }
    
    handleNext() {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            }, this.sendData));
        }
    }
    
    sendData() {
        const { finished, weight, fatPercentage, fatKg, muscleKg } = this.state;
        const url = `${urlConfig.baseUrl}/userprogresses`;
        const data = {
            weight: parseFloat(weight),
            fat_percentage: parseFloat(fatPercentage),
            fat_kilogram: parseFloat(fatKg),
            muscle_kilogram: parseFloat(muscleKg),
        };
        const config = urlConfig.axiosConfig;
        config.method = 'POST';
        if ( finished ) {
            axios.post(url, data, config)
                .then( result => result)
                .catch(err => err);
        }
    }

    handlePrev() {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    }
    handleInputChange( event ) {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [name]: value
        }, this.completeState);
    }

    completeState() {
        const { fatPercentage, weight } = this.state;

        if ( fatPercentage !== '' ) {
            const fatKg = (weight * (fatPercentage / 100)) + '';
            const muscleKg = (weight - fatKg) + '';
            this.setState({ fatKg: this.fixNumber(fatKg), muscleKg: this.fixNumber(muscleKg) });
        }
    }

    fixNumber( number ) {
        return Number.parseFloat(number).toFixed(2);
    }
    
    getStepContent( stepIndex ) {
        switch ( stepIndex ) {
            case 0:
                return (
                    <HeightWeight 
                        onChange={this.handleInputChange}
                        height={this.state.height}
                        weight={this.state.weight}
                    />
                );
            case 1:
                return (
                    <FatPercentage
                        onChange={this.handleInputChange}
                        fatPercentage={this.state.fatPercentage}
                        height={this.state.height}
                        weight={this.state.weight}
                     />                    
                );
            case 2:
                return (
                    <UserProgress
                        date={<Moment format="DD/MM/YYYY" />}
                        weight={this.state.weight}
                        height={this.state.height}
                        fatPercentage={this.state.fatPercentage}
                        fatKg={this.state.fatKg}
                        muscleKg={this.state.muscleKg}
                    />
                );
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }
    
    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>
                        Su información ha sido guardada con éxito. <Link to="/">Volver</Link>
                    </p>
                </div>
            );
        }
        
        return (
          <div style={contentStyle}>
            <div>{this.getStepContent(stepIndex)}</div>
            <div style={{marginTop: 24, marginBottom: 12}}>
                <FlatButton
                    label="Volver"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight: 12}}
                />
                <RaisedButton
                    label={stepIndex === 2 ? 'Finalizar' : 'Siguiente'}
                    primary={true}
                    onClick={this.handleNext}
                />
            </div>
          </div>
        );
    }
    
    
    render() {
        const {loading, stepIndex} = this.state;
    
        return (
            <PageBase title="Mis datos"
                navigation="Aplicación / Mi información personal">
                <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Peso y Estatura</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>% Grasa Corporal</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Tu progreso inicial</StepLabel>
                        </Step>
                    </Stepper>
                    <ExpandTransition loading={loading} open={true}>
                        {this.renderContent()}
                    </ExpandTransition>
                </div>
            </PageBase>
        );
    }
}

export default GeneralInfoPage;
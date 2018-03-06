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

class GeneralInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            finished: false,
            stepIndex: 0,

            height: '',
            weight: ''
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
            }));
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
        });
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
                        height={this.state.height}
                        weight={this.state.weight}
                     />                    
                );
            case 2:
                return (
                    <p>
                    Try out different ad text to see what brings in the most customers, and learn how to
                    enhance your ads using features like ad extensions. If you run into any problems with your
                    ads, find out how to tell if they're running and how to resolve approval issues.
                    </p>
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
                    <a
                        href="#"
                        onClick={(event) => {
                        event.preventDefault();
                        this.setState({stepIndex: 0, finished: false});
                        }}
                    >
                        Click here
                    </a> to reset the example.
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
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FoodForm from '../../../components/Food/FoodForm';

class CreateFoodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        };
        this.isSubmitted = this.isSubmitted.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    isSubmitted( submitted ) {
        this.setState({ submitted });
    }
    
    handleClose() {
        this.setState({ submitted: false });
    }

    render() {
        const actions = [
            <FlatButton
                key={0}
                label="Aceptar"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <div>
                <Dialog
                    title="Alimento registrado"
                    actions={actions}
                    modal={false}
                    open={this.state.submitted}
                    onRequestClose={this.handleClose}
                >
                    El alimento ha sido registrado con éxito.
                </Dialog>
                <FoodForm
                    onSubmitted={this.isSubmitted}
                />
            </div>
        );
    }
}

export default CreateFoodPage;
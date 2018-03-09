import React, { Component } from 'react';
import ExerciceForm from '../../../components/Exercice/ExerciceForm';

class CreateExercicePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
          <ExerciceForm />
        </div>
      );
    }
}

export default CreateExercicePage;
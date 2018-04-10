import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import urlConfig from '../../url-config';
import SelectExercise from './SelectExercise';
import ReactTable from 'react-table';
import filterCaseInsensitive from '../../shared/tableFiltering';
import { typography } from 'material-ui/styles';

class DialogContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      bodyAreas: [],
      exercises: []
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.fetchExercises = this.fetchExercises.bind(this);
    this.fetchBodyAreas = this.fetchBodyAreas.bind(this);
  }

  componentWillMount() {
    this.fetchExercises();
    this.fetchBodyAreas();
  }

  fetchExercises() {
    const url = `${urlConfig.baseUrl}/exercises`;
    const config = urlConfig.config;
    axios.get(url, config)
      .then( response => this.setState({ dataSource: response.data.data }));
  }

  fetchBodyAreas() {
    const url = `${urlConfig.baseUrl}/bodyareas`;
    const config = urlConfig.config;
    axios.get(url, config)
      .then( response => this.setState({ bodyAreas: response.data.data }));
  } 

  handleSelectChange(event, index, value){
    const { bodyAreas } = this.state;
    const bodyAreaSelected = bodyAreas.filter( bodyArea => bodyArea.id === value );
    this.setState({ value, exercises: bodyAreaSelected[0].exercises });
  }

  render() {
    return (
      <div>
        <div style={styles.stepMessage}>
          <strong style={styles.strongStepMessage}> Paso 1: </strong> Selecciona un área de cuerpo que desees trabajar
        </div>
        <SelectExercise
          value={this.state.value}
          onChange={this.handleSelectChange}
          bodyAreas={this.state.bodyAreas}
        />

        <div style={styles.stepMessage}>
          <strong style={styles.strongStepMessage}> Paso 2: </strong> Selecciona el ejercicio de tu agrado
        </div>
        <ReactTable
          filterable
          defaultFilterMethod={filterCaseInsensitive}
          data={this.state.exercises}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
          style={{cursor: 'pointer'}}
          noDataText="Aún no existen ejercicios para esta área"
          getTrProps={(state, rowInfo) => {
              return {
                onClick: () => this.props.onResponse(rowInfo.original)
              };
            }
          }
        />
      </div>
    );
  }
}
const columns = [
  {
    Header: "ID",
    accessor: "id",
    maxWidth: 100
  },
  {
    Header: "Nombre",
    accessor: "name"
  }
];

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  stepMessage: {
    fontWeight: typography.fontWeightLight,
    textAlign: 'left',
    padding: '5px 0'
    
  }
};

DialogContent.propTypes = {
  onResponse: PropTypes.func
};

export default DialogContent;
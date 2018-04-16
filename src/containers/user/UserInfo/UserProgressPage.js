import React, { Component } from 'react';
import urlConfig from '../../../url-config';
import axios from 'axios';
import LinearChart from '../../../components/Charts/LinearChart';
import { typography } from 'material-ui/styles';
import PageBase from '../../../components/PageBase';

class UserProgressPage extends Component {

  constructor() {
    super();
    this.state = {
      progresses: [],
      weightProgress: [],
    };
    this.fetchUserProgress = this.fetchUserProgress.bind(this);
    this.weightData = this.weightData.bind(this);
  }

  componentDidMount() {
    this.fetchUserProgress();
  }

  fetchUserProgress() {
    const { baseUrl, axiosConfig } = urlConfig;
    const url = `${baseUrl}/userprogresses/currentUserProgresses`;
    
    axios.get(url, axiosConfig)
      .then( res => {
        const progresses = res.data.data;
        this.setState({
          progresses: progresses,
          weightProgress: this.weightData(progresses),
        });
      })
      .catch( err => {throw err;});
  }

  weightData( progresses ) {
    return progresses.map( progress => {
      const { weight, progress_date,  } = progress;
      return { peso: weight, name: progress_date };
    });
  }
  
  render() {
    return (
      <PageBase
        title="Mi progreso">

        <div className="row">
          <div className="col-md-6">
            <p style={styles.title}>Progreso en relación a mi peso</p>
            {/*
              Mostrar un select para que elija visualizar la gráfica por:
                * Año
                * Mes (Habrá múltiples líneas en la gráfica, cada línea representando un mes)
            */}
            
            <LinearChart dataKey="peso" data={this.state.weightProgress} />
          </div>
        </div>
      </PageBase>

    );
  }
}

const styles = {
  paper: {
    padding: 20,
  },
  title: {
    fontWeight: typography.fontWeightLight,
    fontSize: 20,
  }
};

export default UserProgressPage;
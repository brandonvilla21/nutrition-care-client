import React, { Component } from 'react';
import urlConfig from '../../../url-config';
import axios from 'axios';
import LinearChart from '../../../components/Charts/LinearChart';
import { typography } from 'material-ui/styles';
import PageBase from '../../../components/PageBase';
import { FlatButton } from 'material-ui';
import PDFMake from '../../../components/PDF/PDFMake';

class UserProgressPage extends Component {

  constructor() {
    super();
    this.state = {
      progresses: [],
      weightProgress: [],
    };
    this.fetchUserProgress = this.fetchUserProgress.bind(this);
    this.weightData = this.weightData.bind(this);
    this.save = this.save.bind(this);
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

  save() {
    const pdfMake = PDFMake.make();
    const user = JSON.parse(localStorage.getItem('user'));
    const  { progresses } = this.state;

    const docDefinition = PDFMake.docDefinitionUserProgress(user, 184, progresses);

    PDFMake.open(pdfMake, docDefinition);
  }
  
  render() {
    return (
      <PageBase
        title="Mi progreso">

        <div style={styles.container} className="">
          <div className="col-md-12">
            <p style={styles.title}>Progreso en relación a mi peso</p>
            {/*
              Mostrar un select para que elija visualizar la gráfica por:
                * Año
                * Mes (Habrá múltiples líneas en la gráfica, cada línea representando un mes)
            */}
            
            <LinearChart dataKey="peso" data={this.state.weightProgress} />
            <br />
            <div>
                <FlatButton  label="Download" onClick={this.save}/>
            </div>
          </div>
        </div>
      </PageBase>

    );
  }
}

const styles = {
  container: {
    // padding: 10,
  },
  paper: {
    padding: 20,
  },
  title: {
    fontWeight: typography.fontWeightLight,
    fontSize: 20,
  }
};

export default UserProgressPage;
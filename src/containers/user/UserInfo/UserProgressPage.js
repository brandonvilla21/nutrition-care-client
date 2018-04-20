import React, { Component } from 'react';
import urlConfig from '../../../url-config';
import axios from 'axios';
import LinearChart from '../../../components/Charts/LinearChart';
import { typography } from 'material-ui/styles';
import PageBase from '../../../components/PageBase';
import { FlatButton, Divider, SelectField, MenuItem } from 'material-ui';
import PDFMake from '../../../components/PDF/PDFMake';
import ProgressTable from '../../../components/UserInfo/Progress/ProgressTable';
import AreaChartP from '../../../components/Charts/AreaChartP';
import BarChartP from '../../../components/Charts/BarChartP';
import PieChartP from '../../../components/Charts/PieChartP';
import DonutChartP from '../../../components/Charts/DonutChartP';
import html2canvas from 'html2canvas';

class UserProgressPage extends Component {

  constructor() {
    super();
    this.state = {
      progresses: [],
      dataChart: [],
      chartSelected: 'Lineal',
      dataKey: 'peso',
      chartType: [
        { name: 'Lineal', value: 'Lineal' },
        { name: 'Área', value: 'Area' },
        { name: 'Barras', value: 'Bar' },
        { name: 'Pie', value: 'Scatter' },
        { name: 'Dona', value: 'Donut' },
      ],
    };
    this.fetchUserProgress = this.fetchUserProgress.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.menuItems = this.menuItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.getCanvasFromDiv = this.getCanvasFromDiv.bind(this);
    this.performPDFAction = this.performPDFAction.bind(this);
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
          dataChart: this.getChartData(progresses, 'weight', 'peso'),
          dataKey: 'peso'
        });
      })
      .catch( err => {throw err;});
  }

  getChartData(progresses, value, name) {
    return progresses.map( progress => {
      return Object.assign({}, {
        [name]: progress[value],
        name: progress.progress_date,
      });
    });
  }
  performPDFAction( action ) {
    const pdfMake = PDFMake.make();
    const user = JSON.parse(localStorage.getItem('user'));
    const  { progresses } = this.state;
    
    this.getCanvasFromDiv()
      .then(canvas => {
        const base64 = canvas.toDataURL();
        const docDefinition = PDFMake.docDefinitionUserProgress(user, 184, progresses, base64);
        switch(action) {
          case 'open': 
            PDFMake.open(pdfMake, docDefinition);
            break;
          case 'download': 
            PDFMake.download(pdfMake, docDefinition);
            break;
          case 'print': 
            PDFMake.print(pdfMake, docDefinition);
            break;
          default:
            PDFMake.open(pdfMake, docDefinition);
        }
    });
  }

  handleChange(event, index, value) {
    this.setState({ chartSelected: value });
  }

  onHeaderClick(value, name) {
    const { progresses } = this.state; 
    this.setState({
      dataChart: this.getChartData(progresses, value, name),
      dataKey: name
    });
  }

  menuItems() {
    const { chartType } = this.state;
    return chartType.map( (chart, index) => (
       <MenuItem
        key={index}
        insetChildren={true}
        value={chart.value}
        primaryText={chart.name}
      />
    ));
  }
  
  renderChart() {
    const { chartSelected, dataChart, dataKey } = this.state;
    switch ( chartSelected ) {
      case 'Lineal':
        return <LinearChart dataKey={dataKey} data={dataChart} />;
      case 'Area':
        return <AreaChartP dataKey={dataKey} data={dataChart}/>;
      case 'Bar':
        return <BarChartP dataKey={dataKey} data={dataChart}/>;
      case 'Scatter':
        return <PieChartP dataKey={dataKey} data={dataChart}/>;
      case 'Donut':
        return <DonutChartP dataKey={dataKey} data={dataChart}/>;
      default:
        return <LinearChart dataKey={dataKey} data={dataChart} />;
    }
  }

  getCanvasFromDiv() {
    return html2canvas(this.canvasDiv);
  }
  render() {
    
    return (
      <PageBase
        title="Mi progreso">
        <div>
          <div className="row">
            <div className="col-md-6">
              <p style={styles.title}>Reporte sobre mi progreso</p>
            </div>
            <div className="col-md-6">
              <SelectField
                fullWidth={true}
                value={this.state.chartSelected}
                floatingLabelText="Tipo de gráfica"
                onChange={this.handleChange}
                >
                  {this.menuItems()}
                </SelectField>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <ProgressTable onHeaderClick={this.onHeaderClick} progresses={this.state.progresses} />
            </div>
            <div ref={(e) => {this.canvasDiv = e;}} style={styles.container} className="col-md-6">
                {this.renderChart()}
                <p style={styles.chartTittle}>
                  Representación gráfica de mis resultados acerca de mi 
                  <strong> {this.state.dataKey}</strong>
                </p>
            </div>
          </div>
          <br />
          <div className="row">
              <div className="col-md-12">
                <Divider />
                <div style={styles.floatRight}>
                  <p style={styles.pdfTitle}>Operaciones PDF</p>
                  <FlatButton primary={true} label="Abrir" onClick={() => {this.performPDFAction('open');}}/>
                  <FlatButton primary={true} label="Descargar" onClick={() => {this.performPDFAction('download');}}/>
                  <FlatButton primary={true} label="Imprimir" onClick={() => {this.performPDFAction('print');}}/>
                </div>
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
  },
  chartTittle: {
    fontWeight: typography.fontWeightLight,
    fontSize: 15,
    textAlign: 'center',
  },
  pdfTitle: {
    marginLeft: 20,
    fontWeight: typography.fontWeightMedium,
    fontSize: 16,
    paddingBottom: '0',
    marginBottom: 5,
    textAlign: 'center',
  },
  floatRight: {
    float: 'right'
  }
};

export default UserProgressPage;
import React, { Component } from 'react';
import urlConfig from '../../../url-config';
import axios from 'axios';
import LinearChart from '../../../components/Charts/LinearChart';
import { typography } from 'material-ui/styles';
import PageBase from '../../../components/PageBase';
import { FlatButton, Divider, SelectField, MenuItem } from 'material-ui';
import PDFMake from '../../../components/PDF/PDFMake';
import FoodReportTable from '../../../components/Food/FoodReportTable';
import AreaChartP from '../../../components/Charts/AreaChartP';
import BarChartP from '../../../components/Charts/BarChartP';
import PieChartP from '../../../components/Charts/PieChartP';
import DonutChartP from '../../../components/Charts/DonutChartP';
import html2canvas from 'html2canvas';

class FoodReportsPage extends Component {

  constructor() {
    super();
    this.state = {
      foods: [],
      dataChart: [],
      chartSelected: 'Donut',
      endpointSelected: 'withMoreProtein',
      chartType: [
        { name: 'Lineal', value: 'Lineal' },
        { name: 'Área', value: 'Area' },
        { name: 'Barras', value: 'Bar' },
        { name: 'Pie', value: 'Scatter' },
        { name: 'Dona', value: 'Donut' },
      ],
      endpoints: [
        { 
          name: 'Reporte de alimentos con más proteínas', 
          value: 'withMoreProtein',
          dataKey: 'proteína',
          propertyToGraph: 'proteins',
        },
        { 
          name: 'Reporte de alimentos con más carbohidratos', 
          value: 'withMoreCarbohydrates',
          dataKey: 'carbohidratos',
          propertyToGraph: 'carbohydrates',
        },
      ],
    };
    this.getFoods = this.getFoods.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.menuItems = this.menuItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
    this.getCanvasFromDiv = this.getCanvasFromDiv.bind(this);
    this.performPDFAction = this.performPDFAction.bind(this);
  }

  componentDidMount() {
    this.getFoods();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.endpointSelected !== prevState.endpointSelected)
      this.getFoods()
    
  }

  getFoods() {

    const { endpointSelected } = this.state;
    const { baseUrl, axiosConfig } = urlConfig;
    const url = `${baseUrl}/foods/${endpointSelected}`;
    return axios.get(url, axiosConfig)
      .then( res => {
        const foods = res.data.data;

        foods.forEach( food => {
          food.calories = this.roundNumber(food.calories * 100);
          food.carbohydrates = this.roundNumber(food.carbohydrates * 100);
          food.fats = this.roundNumber(food.fats * 100);
          food.proteins = this.roundNumber(food.proteins * 100);
        });

        //Get current selected endpoint object.
        const currentEndpoint = [ ...this.state.endpoints ].find( endpoint => {
          return endpoint.value === this.state.endpointSelected;
        });

        this.setState({
          foods: foods,
          dataChart: this.getChartData(
            foods, 
            currentEndpoint.propertyToGraph, 
            currentEndpoint.dataKey
          ),
          dataKey: currentEndpoint.dataKey
        });
      })  
      .catch( err => {throw err;});

  }

  roundNumber( num ) { 
    return Math.round(num * 100) / 100; 
  }

  performPDFAction( action ) {
    const pdfMake = PDFMake.make();
    const  { foods } = this.state;
    
    
    this.getCanvasFromDiv()
      .then(canvas => {
        const base64 = canvas.toDataURL();
        const docDefinition = PDFMake.docDefinitionFoods({ 
          foods: foods, 
          chartImage: base64 
        });

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

  handleChange( property, event, index, value ) {
    this.setState({ [property]: value });
  }

  onHeaderClick(value, name) {
    const { foods } = this.state; 
    this.setState({
      dataChart: this.getChartData(foods, value, name),
      dataKey: name
    });
  }

  menuItems( accessorArray ) {
    // console.log('accessorArray: ', accessorArray);

    return this.state[accessorArray].map( (element, index) => (
       <MenuItem
        key={index}
        insetChildren={true}
        value={element.value}
        primaryText={element.name}
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

  getChartData(foods, value, name) {
    return foods.map( food => {
      return Object.assign({}, {
        [name]: food[value],
        name: food.description,
      });
    });
  }

  getCanvasFromDiv() {
    return html2canvas(this.canvasDiv);
  }
  render() {
    
    return (
      <PageBase
        title="Reportes de alimentos">
        <div>
          <div className="col-md-12">
            <FoodReportTable foods={this.state.foods}/>
          </div>

          <div className="row">

            <div className="col-md-6 col-sm-12">
              <SelectField
                fullWidth={true}
                name="chartSelected"
                value={this.state.chartSelected}
                floatingLabelText="Tipo de gráfica"
                onChange={this.handleChange.bind(this,'chartSelected')}
                >
                  {this.menuItems('chartType')}
                </SelectField>
            </div>

            <div className="col-md-6 col-sm-12">
              <SelectField
                fullWidth={true}
                name="endpointSelected"
                value={this.state.endpointSelected}
                floatingLabelText="Reporte a seleccionar"
                onChange={this.handleChange.bind(this, 'endpointSelected')}
                >
                  {this.menuItems('endpoints')}
              </SelectField>
            </div>

          </div>

          <div className="row">
          </div>
          <div className="row">

            <div className="col-md-12" ref={(e) => {this.canvasDiv = e;}} style={styles.container}>
                {this.renderChart()}
                <p style={styles.chartTittle}>
                  Representación gráfica de los alimentos con más
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
                  <FlatButton primary={true} label="Abrir" onClick={this.performPDFAction.bind(this, 'open')}/>
                  <FlatButton primary={true} label="Descargar" onClick={this.performPDFAction.bind(this, 'download')}/>
                  <FlatButton primary={true} label="Imprimir" onClick={this.performPDFAction.bind(this, 'print')}/>
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

export default FoodReportsPage;
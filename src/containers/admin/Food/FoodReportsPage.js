import React, { Component } from 'react';
import urlConfig from '../../../url-config';
import axios from 'axios';
import LinearChart from '../../../components/Charts/LinearChart';
import { typography } from 'material-ui/styles';
import PageBase from '../../../components/PageBase';
import { FlatButton, Divider, SelectField, MenuItem, TextField } from 'material-ui';
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
      chartSelected: 'Lineal',
      columnOptionSelected: 1,
      limit: 15,
      chartType: [
        { name: 'Lineal', value: 'Lineal' },
        { name: 'Área', value: 'Area' },
        { name: 'Barras', value: 'Bar' },
        { name: 'Pie', value: 'Scatter' },
        { name: 'Dona', value: 'Donut' },
      ],
      columnOptions: [
        { 
          name: 'Reporte de alimentos con más proteínas', 
          value: 1,
          column: 'proteins',
          order: 'desc',
          dataKey: 'proteína',
          propertyToGraph: 'proteins',
        },
        { 
          name: 'Reporte de alimentos con más carbohidratos', 
          value: 2,
          column: 'carbohydrates',
          order: 'desc',
          dataKey: 'carbohidratos',
          propertyToGraph: 'carbohydrates',
        },
        { 
          name: 'Reporte de alimentos con más grasas', 
          value: 3,
          column: 'fats',
          order: 'desc',
          dataKey: 'grasas',
          propertyToGraph: 'fats',
        },
        { 
          name: 'Reporte de alimentos con menos proteínas', 
          value: 4,
          column: 'proteins',
          order: 'asc',
          dataKey: 'proteína',
          propertyToGraph: 'proteins',
        },
        { 
          name: 'Reporte de alimentos con menos carbohidratos', 
          value: 5,
          column: 'carbohydrates',
          order: 'asc',
          dataKey: 'carbohidratos',
          propertyToGraph: 'carbohydrates',
        },
        { 
          name: 'Reporte de alimentos con menos grasas', 
          value: 6,
          column: 'fats',
          order: 'asc',
          dataKey: 'grasas',
          propertyToGraph: 'fats',
        },
      ],
    };
    this.getFoods = this.getFoods.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.menuItems = this.menuItems.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.getCanvasFromDiv = this.getCanvasFromDiv.bind(this);
    this.performPDFAction = this.performPDFAction.bind(this);
  }

  componentDidMount() {
    this.getFoods();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.columnOptionSelected !== prevState.columnOptionSelected)
      this.getFoods();
    
  }

  getFoods() {

    const { limit } = this.state;
    const { order, column } = this.getCurrentSelectedOption();

    const { baseUrl, axiosConfig } = urlConfig;
    const url = `${baseUrl}/foods/reports`;
    const data = { column, order, limit };

    return axios.post(url, data, axiosConfig)
      .then( res => {
        const foods = res.data.data;

        foods.forEach( food => {
          food.calories = this.roundNumber(food.calories * 100);
          food.carbohydrates = this.roundNumber(food.carbohydrates * 100);
          food.fats = this.roundNumber(food.fats * 100);
          food.proteins = this.roundNumber(food.proteins * 100);
        });
        
        //Get current selected endpoint object.
        const currentOption = this.getCurrentSelectedOption();

        this.setState({
          foods: foods,
          dataChart: this.getChartData(
            foods, 
            currentOption.propertyToGraph, 
            currentOption.dataKey
          ),
          dataKey: currentOption.dataKey
        });
      })  
      .catch( err => {throw err;});

  }

  getCurrentSelectedOption() {

    return [ ...this.state.columnOptions ].find( endpoint => {
      return endpoint.value === this.state.columnOptionSelected;
    });

  }

  roundNumber( num ) { 
    return Math.round(num * 100) / 100; 
  }

  performPDFAction( action ) {
    const pdfMake = PDFMake.make();
    const  { foods } = this.state;
    const currentSelection = this.getCurrentSelectedOption();
    
    this.getCanvasFromDiv()
      .then(canvas => {
        const base64 = canvas.toDataURL();
        const docDefinition = PDFMake.docDefinitionFoods({ 
          foods: foods, 
          chartImage: base64,
          reportName: currentSelection.name,
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

  handleSelectChange( property, event, index, value ) {
    this.setState({ [property]: value });
  }

  handleInputChange( event ) {
    const name = event.target.name;
    const value = event.target.value;
  
    this.setState({
        [name]: value
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

          <div className="col-md-12">
            <div className="row">

              <div className="col-md-4 col-sm-12">
                <SelectField
                  fullWidth={true}
                  name="chartSelected"
                  value={this.state.chartSelected}
                  floatingLabelText="Tipo de gráfica"
                  onChange={this.handleSelectChange.bind(this,'chartSelected')}
                  >
                    {this.menuItems('chartType')}
                  </SelectField>
              </div>

              <div className="col-md-5 col-sm-11">
                <SelectField
                  fullWidth={true}
                  name="columnOptionSelected"
                  value={this.state.columnOptionSelected}
                  floatingLabelText="Reporte a seleccionar"
                  onChange={this.handleSelectChange.bind(this, 'columnOptionSelected')}
                  >
                    {this.menuItems('columnOptions')}
                </SelectField>
              </div>

              <div className="col-md-1 col-sm-12">
                <TextField
                  name="limit"
                  type="number"
                  floatingLabelText="Número de filas"
                  min="1"
                  max="20"
                  onChange={this.handleInputChange}
                  value={this.state.limit}
                />
              </div>

            </div>
          </div>
          
          <div className="row">

            <div className="col-md-12" ref={(e) => {this.canvasDiv = e;}} style={styles.container}>
                {this.renderChart()}
                <p style={styles.chartTittle}>
                  Representación gráfica de 
                  <strong> {this.getCurrentSelectedOption().name}</strong>
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
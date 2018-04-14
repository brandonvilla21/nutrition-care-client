import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import { Tabs, Tab } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import axios from 'axios';
import urlConfig from '../../url-config';
import { blue500, grey700 } from 'material-ui/styles/colors';
import 'react-table/react-table.css';
import SelectableTable from '../SelectableTable';
import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import AvPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import ActionHelp from 'material-ui/svg-icons/action/help';

import debounce from 'lodash.debounce';

import DietTableCalculator from './DietTableCalculator';
import DietTotalsCard from './DietTotalsCard/DietTotalsCard';

class ExerciceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          foods: [],
          selectedFoods: [],
          totalCarbohydrates: 0,
          totalProteins: 0,
          totalFats: 0,
          totalCalories: 0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.disableButton = this.disableButton.bind(this);
        this.toggleRow = this.toggleRow.bind(this);
        this.onChangeDataTableFields = this.onChangeDataTableFields.bind(this);
        this.onRecalculateTotals = debounce(this.onRecalculateTotals.bind(this), 250);
    }


    componentDidMount() {
      this.getFoods()
          .then(foods => {
            foods.forEach( food => {
              food.desiredGrams = INITIAL_GRAMS;
              food.desiredProteins = food.proteins;
              food.desiredFats = food.fats;
              food.desiredCarbohydrates = food.carbohydrates;
              food.desiredCalories = food.calories;
            });
            this.setState({ foods });
          });
    }


    componentDidUpdate(prevProps, prevState) {
      if (this.state.selectedFoods !== prevState.selectedFoods)
        this.onRecalculateTotals();
      
    }


    onRecalculateTotals() {

      const selectedFoods = [ ...this.state.selectedFoods ];

        const totals = 
          selectedFoods
            .reduce((accumulator, currentFood) => {
              return { 
                totalCalories: this.roundNumber(currentFood.desiredCalories + accumulator.totalCalories),
                totalCarbohydrates: this.roundNumber(currentFood.desiredCarbohydrates + accumulator.totalCarbohydrates ),
                totalFats: this.roundNumber( currentFood.desiredFats + accumulator.totalFats ),
                totalProteins: this.roundNumber( currentFood.desiredProteins + accumulator.totalProteins ),
              };
            },
            { totalCalories: 0, totalCarbohydrates: 0, totalFats: 0, totalProteins: 0 }
          );

        const { totalCalories, totalCarbohydrates, totalFats, totalProteins } = totals;

        this.setState({ totalCalories, totalCarbohydrates, totalFats, totalProteins });

    }

 
    handleChange( event ) {
      const name = event.target.name;
      const value = event.target.value;

      this.setState({
          [name]: value
      });
    }


    handleSubmit( event ) {
      event.preventDefault();
      const url = `${urlConfig.baseUrl}/diets`;
      const config = urlConfig.axiosConfig;
      config.method = 'POST';

      const { 
        totalCarbohydrates, totalProteins, totalFats,
        totalCalories
       } = this.state;

      const selectedFoods = [ ...this.state.selectedFoods ].map( food => {
        return { 
          food_id: food.id,
          food_calories: food.desiredCalories,
          food_carbohydrates: food.desiredCarbohydrates,
          food_fats: food.desiredFats,
          food_proteins: food.desiredProteins,
          food_grams: food.desiredGrams
        };
      });
        
      const data = { 
        totalCarbohydrates, totalProteins, totalFats,
        totalCalories, selectedFoods, register_date: this.getDate()
      };

      axios.post(url, data, config)
          .then( response => {
            if (response.status === 200) {
                  this.props.onSubmitted(true);
                  this.clearState();
              } else 
                this.props.onSubmitted(false);
              
          })
          .catch(err => {
            this.props.onSubmitted(false);
            throw err;
          });
    }

    getDate() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  }

    getFoods() {
        const url = `${urlConfig.baseUrl}/foods`;
        return fetch(url)
            .then( data => data.json())
            .then( response => response.data);
    }

    
    // disableButton() {
    //     return true;
    // }
    

    clearState() {
        this.setState({
          user_id: '',
          foods: [],
          dietState: '',
          selectedFoods: [],
          selected: {}
        });
    }


    toggleRow(original) {
      
      let selectedFoods = [
        ...this.state.selectedFoods
      ];
      const elementIndex = selectedFoods.findIndex( element => element.id == original.id );
      // check to see if the key exists
      if (elementIndex >= 0) {
        // it does exist so we will remove it using destructing
        selectedFoods = [
          ...selectedFoods.slice(0, elementIndex),
          ...selectedFoods.slice(elementIndex + 1)
        ];

      } else {
        // it does not exist so add it
        selectedFoods.push(original);
      }
      // update the state
      this.setState({ selectedFoods });

    } 


    onChangeDataTableFields(original, accessor, event) {

      const value = event.target.value;
      const selectedFoods = [ ...this.state.selectedFoods ];
      const index = selectedFoods.findIndex( element => element.id == original.id );


      selectedFoods[index][accessor] = Number(value);

      //Calculate remaining columns.
      const current = selectedFoods[index];

      this.calculateDataTableData( current, accessor );
      
      this.setState({ selectedFoods });

    }

    calculateDataTableData( current, accessor ) {


      if( accessor === 'desiredCalories' ) {

        current.desiredProteins = this.roundNumber((current.proteins / current.calories) * current[accessor]);
        current.desiredCarbohydrates = this.roundNumber((current.carbohydrates / current.calories) * current[accessor]);
        current.desiredFats = this.roundNumber((current.fats / current.calories) * current[accessor]);
        current.desiredGrams = this.roundNumber((INITIAL_GRAMS / current.calories) * current[accessor]);

      } else {//accessor is equals to desiredGrams
        
        current.desiredProteins = this.roundNumber(current.proteins * current[accessor]);
        current.desiredFats = this.roundNumber(current.fats * current[accessor]);
        current.desiredCarbohydrates = this.roundNumber(current.carbohydrates * current[accessor]);
        current.desiredCalories = this.roundNumber(current.calories * current.desiredGrams);
      
      }

    }

    roundNumber( num ) { return Math.round(num * 100) / 100; }

    calculateTotals() {
      
    }


    render() {
        const { 
          foods, selectedFoods, totalCalories, 
          totalCarbohydrates, totalFats, totalProteins 
        } = this.state;

        return(
            <PageBase
                title="Registrar una dieta"
                navigation="Dietas / Registro">
                
              <div>
                <Card>
                  <CardHeader 
                    title="Aviso"
                    subtitle="Recomendaciones"
                    actAsExpander={true}
                    showExpandableButton={true}
                    avatar={<ActionHelp style={{ marginTop: 10, color: grey700 }}/>}
                  />
                  <CardText expandable={true} style={{ color: grey700, fontSize: 16 }}>
                    En esta sección podrás seleccionar entre múltiples opciones de alimentos
                    y elegir las que más te gusten para armar tu dieta personalizada ;)
                  </CardText>
                </Card>

                  <form onSubmit={this.handleSubmit}>
                  
                  <Tabs style={styles.tabs}>

                    <Tab 
                      icon={<ActionShoppingBasket />}
                      style={styles.tab} label="Alimentos disponibles">
                      <div>

                        <br/>
                        
                        <SelectableTable 
                          elements={foods}
                          selectedElements={selectedFoods}
                          mainTableHeader="SELECCIONA LOS ALIMENTOS QUE DESEAS AGREGAR A TU DIETA :)"
                          secondaryTableHeader="ALIMENTOS SELECCIONADOS"
                          defaultPageSize={10}
                          noDataTextMainTable="No hay datos actualmente :("
                          noDataTextSecondaryTable="Selecciona un elemento de la otra tabla ;)"
                          columns={selectableFoodColumns}
                          onToggleRow={this.toggleRow}
                          enableSecondaryTable={false}
                        />
                        
                      </div>
                    </Tab>

                    <Tab style={styles.tab} label="Estos son tus alimentos seleccionados para tu dieta :)"
                      icon={<AvPlaylistAddCheck style={styles.iconStyles} color={blue500} />}>
                      <div>

                        <DietTableCalculator 
                          selectedFoods={selectedFoods}
                          onChangeTable={this.onChangeDataTableFields}
                        />

                        <DietTotalsCard
                          totalCalories={totalCalories}
                          totalCarbohydrates={totalCarbohydrates}
                          totalFats={totalFats}
                          totalProteins={totalProteins}
                        />

                      </div>
                    </Tab>
                  </Tabs>

                  <RaisedButton
                      label="Registrar dieta"
                      primary={true}
                      type="submit"
                      // disabled={this.disableButton()}
                      style={styles.button} />

                  </form>
              </div>

            </PageBase>
        );
    }
}
ExerciceForm.propTypes = {
    onSubmitted: PropTypes.func
};

const selectableFoodColumns = [
  {
    Header: "ID",
    accessor: "id",
    maxWidth: 100
  },
  {
    Header: "Descripción",
    accessor: "description",
    style: { whiteSpace: 'normal' }
  },
  {
    Header: "Proteínas por g.",
    accessor: "proteins",
    maxWidth: 150    
    
  },
  {
    Header: "Carbohídratos por g.",
    accessor: "carbohydrates",
    maxWidth: 150    
  },
  {
    Header: "Grasas por g.",
    accessor: "fats",
    maxWidth: 150    
  },
  {
    Header: "Calorías por g.",
    accessor: "calories",
    maxWidth: 150    
  }
];

const styles = {
    button: {
        margin: 10,
        float: 'right'
    },
    tab: {
      backgroundColor: blue500,
      inkBarStyle: {
        backgroundColor: 'white'
      }
    },
    tabs: {
      borderRadius: '10px red',
      paddingTop: '18px'
    },
    iconStyles: {
      marginRight: 24,
    }
};

const INITIAL_GRAMS = 1;

export default ExerciceForm;
import React, { Component, PropTypes } from 'react';
import PageBase from '../../../components/PageBase';
import axios from 'axios';
import urlConfig from '../../../url-config';
import 'react-table/react-table.css';

import TabsDiet from './TabsDiet';
import debounce from 'lodash.debounce';

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
        this.onSubmitDiet = this.onSubmitDiet.bind(this);
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


    onSubmitDiet( ) {
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
                  <TabsDiet 
                    foods={foods}
                    selectedFoods={selectedFoods}
                    totalCalories={totalCalories}
                    totalCarbohydrates={totalCarbohydrates}
                    totalFats={totalFats}
                    totalProteins={totalProteins}
                    selectableFoodColumns={selectableFoodColumns}
                    toggleRow={this.toggleRow}
                    onChangeDataTableFields={this.onChangeDataTableFields}
                    onSubmitDiet={this.onSubmitDiet}
                  />
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

const INITIAL_GRAMS = 1;

export default ExerciceForm;
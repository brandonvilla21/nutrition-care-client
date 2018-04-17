import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import axios from 'axios';
import urlConfig from '../../url-config';
import 'react-table/react-table.css';

import TabsDiet from './Components/TabsDiet/TabsDiet';
import debounce from 'lodash.debounce';

import { 
  handleChange, onRecalculateTotals, roundNumber, toggleRow,
  getDate, onChangeDataTableFields, 

} from './diet-utils';

class ExerciceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          foods: [],
          selectedFoods: [],
          totalCarbohydrates: 0,
          totalProteins: 0,
          totalFats: 0,
          totalCalories: 0,
          description: ''
        };
        
        this.handleChange = handleChange.bind(this);
        this.onRecalculateTotals = debounce(onRecalculateTotals.bind(this), 250);
        this.toggleRow = toggleRow.bind(this);
        this.onChangeDataTableFields = onChangeDataTableFields.bind(this);
        this.onSubmitDiet = this.onSubmitDiet.bind(this);
    }


    componentDidMount() {
      this.getFoods().then(foods => this.setState({ foods }));
    }


    componentDidUpdate(prevProps, prevState) {
      if (this.state.selectedFoods !== prevState.selectedFoods)
        this.onRecalculateTotals();
      
    }


    onSubmitDiet( resetIndex ) {
      const url = `${urlConfig.baseUrl}/diets`;
      const config = urlConfig.axiosConfig;
      config.method = 'POST';

      const { 
        totalCarbohydrates, totalProteins, totalFats,
        totalCalories, description,
      } = this.state;
      
      const selectedFoods = [ ...this.state.selectedFoods ].map( food => {
        return { 
          food_id: food.id,
          food_calories: food.desiredCalories,
          food_carbohydrates: food.desiredCarbohydrates,
          food_fats: food.desiredFats,
          food_proteins: food.desiredProteins,
          food_grams: food.desiredGrams,
          food_description: food.description,
        };
      });
        
      const data = { 
        totalCarbohydrates, totalProteins, totalFats,
        totalCalories, selectedFoods, register_date: this.getDate(),
        description,
      };

      axios.post(url, data, config)
          .then( response => {
            if (response.status === 200) {
                  this.props.onSubmitted({ submitted: true, err: false });
                  this.resetState();
                  resetIndex();
              } else 
                this.props.onSubmitted({ submitted: false, err: true });
              
          })
          .catch(err => {
            this.props.onSubmitted({ 
              submitted: false, 
              err: true, 
              errorMessage: err.response.data.message
            });
            throw err.response.data.message;
          });
    }


    getFoods() {
        const url = `${urlConfig.baseUrl}/foods`;
        return fetch(url)
            .then( data => data.json())
            .then( response => response.data)
            .then( foods => {
              foods.forEach( food => {
                food.desiredGrams = 1;
                food.desiredProteins = food.proteins;
                food.desiredFats = food.fats;
                food.desiredCarbohydrates = food.carbohydrates;
                food.desiredCalories = food.calories;
              });

              return foods;
            });
    }


    getDate() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };


    resetState() {

      this.setState({
        selectedFoods: [],
        totalCarbohydrates: 0,
        totalProteins: 0,
        totalFats: 0,
        totalCalories: 0,
        description: ''
      });

    }

    
    calculateDataTableData( current, accessor ) {

      if( accessor === 'desiredCalories' ) {
    
        current.desiredProteins = roundNumber((current.proteins / current.calories) * current[accessor]);
        current.desiredCarbohydrates = roundNumber((current.carbohydrates / current.calories) * current[accessor]);
        current.desiredFats = roundNumber((current.fats / current.calories) * current[accessor]);
        current.desiredGrams = roundNumber((INITIAL_GRAMS / current.calories) * current[accessor]);
    
      } else {//accessor is equals to desiredGrams
        
        current.desiredProteins = roundNumber(current.proteins * current[accessor]);
        current.desiredFats = roundNumber(current.fats * current[accessor]);
        current.desiredCarbohydrates = roundNumber(current.carbohydrates * current[accessor]);
        current.desiredCalories = roundNumber(current.calories * current.desiredGrams);
      
      }
    
    }


    render() {
        const { 
          foods, selectedFoods, totalCalories, 
          totalCarbohydrates, totalFats, totalProteins ,
          description,
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
                    description={description}
                    onChangeDataTableFields={this.onChangeDataTableFields}
                    onSubmitDiet={this.onSubmitDiet}
                    onChange={this.handleChange}
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
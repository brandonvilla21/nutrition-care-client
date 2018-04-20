import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import axios from 'axios';
import urlConfig from '../../url-config';
import 'react-table/react-table.css';

import TabsDiet from './Components/TabsDiet';
import debounce from 'lodash.debounce';

import { 
  handleChange, onRecalculateTotals, toggleRow,
  onChangeDataTableFields, calculateDataTableData,
} from './diet-utils';

class DietForm extends Component {

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
        this.calculateDataTableData = calculateDataTableData.bind(this);
        this.onSubmitDiet = this.onSubmitDiet.bind(this);
    }


    componentDidMount() {
      this.getFoods().then(foods => this.setState({ foods }));
    }


    componentDidUpdate(prevProps, prevState) {
      if (this.state.selectedFoods !== prevState.selectedFoods)
        this.onRecalculateTotals();
      
    }

  /**
   * 
   * Gathers and sends all the the proper data to handle the create concerns for
   * the diet and its selected foods.
   * @author Marcos Barrera del Río <elyomarcos@gmail.com>
   * @param resetIndex - A callback to reset the Tabs' index when needed.
   */
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
          calories: food.calories,
          carbohydrates: food.carbohydrates,
          fats: food.fats,
          proteins: food.proteins,
          desiredGrams: food.desiredGrams,
          description: food.description,
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

  /**
   * 
   * Get all the current foods from the API and prepares them
   * properly for the DietForm component.
   * @author Marcos Barrera del Río <elyomarcos@gmail.com>
   */
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

    /**
     * 
     * Generate the today's date on the needed format for the API.
     * @author Marcos Barrera del Río <elyomarcos@gmail.com>
     */
    getDate() {
      const date = new Date();
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }


    /**
     * 
     * Reset the component state.
     * @author Marcos Barrera del Río <elyomarcos@gmail.com>
     */
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
DietForm.propTypes = {
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

export default DietForm;
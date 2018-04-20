import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import axios from 'axios';
import urlConfig from '../../url-config';
import 'react-table/react-table.css';

import EditTabsDiet from './Components/EditTabsDiet';
import debounce from 'lodash.debounce';

import { 
  handleChange, onRecalculateTotals, roundNumber, toggleRow,
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
          description: '',
          manualRemovedFood: {},
        };
        
        this.handleChange = handleChange.bind(this);
        this.onRecalculateTotals = debounce(onRecalculateTotals.bind(this), 250);
        this.toggleRow = toggleRow.bind(this);
        this.onChangeDataTableFields = onChangeDataTableFields.bind(this);
        this.calculateDataTableData = calculateDataTableData.bind(this);
        this.onSubmitDiet = this.onSubmitDiet.bind(this);
        this.removeFoodRow = this.removeFoodRow.bind(this);
        this.clearManualRemovedFoodState = this.clearManualRemovedFoodState.bind(this);
    }


    componentDidMount() {

      const currentFoodsOnDietPromise = this.setDietFoodsToEdit();
      const getFoodsPromise = this.getFoods();

      this.removeRepeatedFoods(currentFoodsOnDietPromise, getFoodsPromise)
        .then(foods => this.setState({ foods }));

    }


    componentDidUpdate(prevProps, prevState) {

      if (this.state.selectedFoods !== prevState.selectedFoods)
        this.onRecalculateTotals();
      
    }


  /**
   * 
   * Removes all the repeated foods from the this.state.foods array 
   * that are duplicate based on the existing from the Diet's details.
   * It removes only the food that have repited 'id' and 'description'
   * at the same time.
   * @author Marcos Barrera del Río <elyomarcos@gmail.com>
   * @returns Promise {<Array<Object>>} - An array without duplicated foods.
   */
    removeRepeatedFoods( currentFoodsOnDietPromise, getFoodsPromise ) {
      
      return Promise.all([currentFoodsOnDietPromise, getFoodsPromise])
        .then(([foodsToCompare, foodsFromAPI]) => {

          const repeatedFoodIdsToRemove = [];

          //Find the repeated foods checking the 'id' and 'description'
          const lengthFoodsFromAPI = foodsFromAPI.length;
          for (let i = 0; i < lengthFoodsFromAPI; i++) {

            const lengthFoodsToCompare = foodsToCompare.length;
            for (let x = 0; x < lengthFoodsToCompare; x++) {
              if( foodsFromAPI[i].id === foodsToCompare[x].id && 
                foodsFromAPI[i].description === foodsToCompare[x].description) {
                repeatedFoodIdsToRemove.push(foodsToCompare[x].id);
                break;
              }
            }
              
          }
          //--------------------------------------

          //Unique foods.
          return foodsFromAPI.filter( food => !repeatedFoodIdsToRemove.includes(food.id));

        });

    }


  /**
   * 
   * Prepares and set all the foods from the current diet that is being
   * edited.
   * @author Marcos Barrera del Río <elyomarcos@gmail.com>
   * @returns Promise {<Array<number>>} - Return an array of objects which
   * contains 'id' and 'description'
   * of every food from the Diet details.
   */
    setDietFoodsToEdit() {
      return this.getDietToEdit().then(({ data }) => {
        const diet = data;

        const selectedFoods = diet.foods.map( food => food.pivot);
        selectedFoods.forEach( food => {
          food.desiredCalories = roundNumber(food.calories * food.desiredGrams);
          food.desiredCarbohydrates = roundNumber(food.carbohydrates * food.desiredGrams);
          food.desiredFats = roundNumber(food.fats * food.desiredGrams);
          food.desiredProteins = roundNumber(food.proteins * food.desiredGrams);
          
          //Only to reuse the second table from the DietForm without any problem with the
          //column id.
          food.id = food.food_id;
        });

        this.setState({ selectedFoods, description: diet.description, });
        

        //Return an array of objects which contains 'id' and 'description'
        //of every food from the Diet details.
        return selectedFoods.map( food => {
          return { id: food.food_id, description: food.description, };
        });

      });
    }

  /**
   * 
   * Gathers and sends all the the proper data to handle the edit concerns for
   * the diet and its selected foods.
   * @author Marcos Barrera del Río <elyomarcos@gmail.com>
   * @param resetIndex - A callback to reset the Tabs' index when needed.
   */
    onSubmitDiet( resetIndex ) {
      const url = `${urlConfig.baseUrl}/diets/${this.props.idToEdit}`;
      const config = urlConfig.axiosConfig;
      config.method = 'PUT';

      const { 
        totalCarbohydrates, totalProteins, totalFats,
        totalCalories, description,
      } = this.state;
      
      const selectedFoods = [ ...this.state.selectedFoods ];
        
      const data = { 
        totalCarbohydrates, totalProteins, totalFats,
        totalCalories, selectedFoods, description,
      };
      
      axios.put(url, data, config)
          .then( response => {
            if (response.status === 200) {
                  this.props.onSubmitted({ submitted: true, err: false });
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
   * Get the diet to edit with all its relationships
   * based on the idToEdit param that is being passed
   * as a prop from the parent component
   * @author Marcos Barrera del Río <elyomarcos@gmail.com>
   */
    getDietToEdit() {

      const idToEdit = this.props.idToEdit;
      const url = `${urlConfig.baseUrl}/diets/${idToEdit}`;
      const config = urlConfig.axiosConfig;
      config.method = 'GET';

      return axios.get(url, config)
        .then( response => response.data)
        .catch(err => {
          throw err.response.data.message;
        });
    }


  /**
   * 
   * Get all the current foods from the API and prepares them
   * properly for the EditDietForm component.
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
            food.food_id = food.id;
            food.foodFromFoodsTable = true;
          });

          return foods;
        });
    }


    removeFoodRow( selectedRow ) {

      if( selectedRow.foodFromFoodsTable === true )
        this.removeFromFirstFoodsTableManually(selectedRow.id);

      
      const selectedFoods = [ ...this.state.selectedFoods ];
      const index = selectedFoods.findIndex( element => element.id == selectedRow.id );

      selectedFoods.splice(index, 1);

      

      this.setState({ selectedFoods });
    }


    removeFromFirstFoodsTableManually( foodId ) {
      const foodsToRemove = { [foodId]: false };
      this.setState({ manualRemovedFood: foodsToRemove });
    }


    clearManualRemovedFoodState () {
      this.setState({ manualRemovedFood: {} });
    }

    
    render() {
        const { 
          foods, selectedFoods, totalCalories, 
          totalCarbohydrates, totalFats, totalProteins ,
          description, manualRemovedFood,
        } = this.state;

        return(
            <PageBase
                title="Registrar una dieta"
                navigation="Dietas / Registro">
                
              <div>
                  <EditTabsDiet 
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
                    removeFoodRow={this.removeFoodRow}
                    manualRemovedFood={manualRemovedFood}
                    clearManualRemovedFoodState={this.clearManualRemovedFoodState}
                  />
              </div>

            </PageBase>
        );
    }
}
DietForm.propTypes = {
    onSubmitted: PropTypes.func,
    idToEdit: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
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
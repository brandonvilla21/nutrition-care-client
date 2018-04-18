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
      this.getDietToEdit().then(({ data }) => {
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

        this.setState({ selectedFoods, description: diet.description, })
        
      });


    }


    componentDidUpdate(prevProps, prevState) {
      if (this.state.selectedFoods !== prevState.selectedFoods)
        this.onRecalculateTotals();
      
    }


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

const INITIAL_GRAMS = 1;

export default DietForm;
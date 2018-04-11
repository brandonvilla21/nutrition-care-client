import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import { Tabs, Tab } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
// import axios from 'axios';
import urlConfig from '../../url-config';
import { blue500 } from 'material-ui/styles/colors';
import 'react-table/react-table.css';
import SelectableTable from '../SelectableTable';
import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import AvPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import DietTableCalculator from './DietTableCalculator';


class ExerciceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user_id: '',
          foods: [],
          dietState: 'ACTIVO',
          selectedFoods: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.toggleRow = this.toggleRow.bind(this);
        this.onChangeDataTableFields = this.onChangeDataTableFields.bind(this);
    }


    componentWillMount() {
      this.getFoods()
          .then(foods => {
            foods.forEach( food => food.grams = 0 );
            this.setState({ foods });
          });
    }


    handleChange( event ) {
      const name = event.target.name;
      const value = event.target.value;

      this.setState({
          [name]: value
      });
    }


    handleSubmit( event ) {
      // event.preventDefault();
      // const url = `${urlConfig.baseUrl}/foods`;
      // const config = urlConfig.axiosConfig;
      // config.method = 'POST';


      // const { name, base64_image, selectedFoods } = this.state;
      // let data = { name, base64_image, selectedFoods };


      // axios.post(url, data, config)
      //     .then( response => {
      //         if (response.status === 200) {
      //             this.props.onSubmitted(true);
      //             this.clearState();
      //         } else
      //             this.props.onSubmitted(false);
      //     })
      //     .catch(() => this.props.onSubmitted(false));
    }


    getFoods() {
        const url = `${urlConfig.baseUrl}/foods`;
        return fetch(url)
            .then( data => data.json())
            .then( response => response.data);
    }

    
    disableButton() {
        return true;
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

      this.setState({ selectedFoods });

    }


    render() {
        const { foods, selectedFoods } = this.state;

        return(
            <PageBase
                title="Registrar una dieta"
                navigation="Dietas / Registro">
                

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
                      />
                      
                    </div>
                  </Tab>
                  <Tab style={styles.tab} label="Estos son tus alimentos seleccionados :)"
                    icon={<AvPlaylistAddCheck style={styles.iconStyles} color={blue500} />}
                       >
                    <div>
                      <DietTableCalculator 
                        selectedFoods={selectedFoods}
                        onChangeTable={this.onChangeDataTableFields}
                       />
                    <h1>
                      PONER TOTALES AQUÍ O EN OTRA TAB
                    </h1>
                    </div>
                  </Tab>
                </Tabs>

                <RaisedButton
                    label="Registrar dieta"
                    primary={true}
                    type="submit"
                    disabled={this.disableButton()}
                    style={styles.button} />

                </form>

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

export default ExerciceForm;
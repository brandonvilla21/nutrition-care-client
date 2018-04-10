import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import { Tabs, Tab } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { typography } from 'material-ui/styles';
import axios from 'axios';
import urlConfig from '../../url-config';
import { blue500 } from 'material-ui/styles/colors';
import 'react-table/react-table.css';
import SelectableTable from '../SelectableTable';
import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import AvPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import ReactTable from 'react-table';
import { Subheader } from 'material-ui';


class ExerciceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            foods: [],
            dietState: '',
            selectedFoods: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.toggleRow = this.toggleRow.bind(this);
    }


    componentWillMount() {
      this.getFoods()
          .then(foods => {
            foods.forEach( food => food.grams = 0);
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


    onChangeGrams(original, event) {

      const value = event.target.value;
      const selectedFoods = [ ...this.state.selectedFoods ];
      const index = selectedFoods.findIndex( element => element.id == original.id );

      selectedFoods[index].grams = Number(value);

      this.setState({ selectedFoods });
      
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


    render() {
        const { foods, selectedFoods } = this.state;

        return(
            <PageBase
                title="Registrar una dieta"
                navigation="Dietas / Registro">
                

                <form onSubmit={this.handleSubmit}>
                {/* <TextField
                    hintText="Nombre"
                    floatingLabelText="Nombre"
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                    fullWidth={true} /> */}


                <Tabs style={styles.tabs}>

                  <Tab 
                    icon={<ActionShoppingBasket />}
                    style={styles.tab} label="Alimentos disponibles" 

                  >
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
                    <ReactTable
                      data={selectedFoods}
                      columns={[

                        {
                          Header: <Subheader inset={true}>INTRODUCE LOS GRAMOS DE CADA UNO DE LOS ALIMENTOS QUE SELECCIONASTE</Subheader>,
                          columns: [
                            ...selectableFoodColumns,
                            {
                              Header: "Gramos",
                              id: "checkbox",
                              accessor: "",
                              filterable: false,
                              sortable: false,
                              Cell: ({ original }) => {
                                return (
                                  <input 
                                    type="number" 
                                    value={original.grams} 
                                    onChange={this.onChangeGrams.bind(this, original)}
                                  />
                                );
                              },
                              width: 200
                            },
                      
                          ]
                        }
                      ]}
                      defaultPageSize={5}
                    />
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
  },
  {
    Header: "Proteínas por g.",
    accessor: "proteins"
  },
  {
    Header: "Carbohídratos por g.",
    accessor: "carbohydrates"
  },
  {
    Header: "Grasas por g.",
    accessor: "fats"
  },
  {
    Header: "Calorías por g.",
    accessor: "calories"
  }
];

const styles = {
    button: {
        margin: 10,
        float: 'right'
    },
    imageTitle: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        marginBottom: 20,
        marginTop: 15
    },
    imageDisplay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto 0'  
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
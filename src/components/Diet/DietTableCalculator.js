import React, { Component, PropTypes } from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { Subheader } from 'material-ui';


class DietTableCalculator extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() { }


    render() {
      
      const { onChangeTable, selectedFoods } = this.props;

      return(


          <div>
            <ReactTable
              data={selectedFoods}
              columns={[

                {
                  Header: <Subheader inset={true}>INTRODUCE LOS GRAMOS DE CADA UNO DE LOS ALIMENTOS QUE SELECCIONASTE</Subheader>,
                  columns: [
                    ...selectedFoodColumns,
                    {
                      Header: "Gramos",
                      id: "text",
                      accessor: "",
                      filterable: false,
                      sortable: false,
                      Cell: ({ original }) => {
                        return (
                          <input
                            type="number"
                            value={original.grams}
                            onChange={onChangeTable.bind(this, original, EDITABLE_PROPERTY_ACCESORS.GRAMS)}
                          />
                        );
                      },
                      width: 200
                    },
                    {
                      Header: "Calorías",
                      id: "text",
                      accessor: "",
                      filterable: false,
                      sortable: false,
                      Cell: ({ original }) => {
                        return (
                          <input
                            type="number"
                            value={original.calories}
                            onChange={onChangeTable.bind(this, original, EDITABLE_PROPERTY_ACCESORS.CALORIES)}
                          />
                        );
                      },
                      width: 200
                    },

                  ]
                },
              ]}
              defaultPageSize={5}
              noDataText="SELECCIONA LOS ALIMENTOS EN LA TABLA ANTERIOR PARA CONTINUAR ;)"
            />
          </div>
        );
    }
}

DietTableCalculator.propTypes = {
  onChangeTable: PropTypes.func,
  selectedFoods: PropTypes.array
};


const selectedFoodColumns = [
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
    Header: "Proteínas",
    accessor: "proteins",
    maxWidth: 100    
    
  },
  {
    Header: "Carbohídratos",
    accessor: "carbohydrates",
    maxWidth: 115    
  },
  {
    Header: "Grasas",
    accessor: "fats",
    maxWidth: 100    
  }
];

const EDITABLE_PROPERTY_ACCESORS = {
  GRAMS: 'grams',
  CALORIES: 'calories'
};
  
export default DietTableCalculator;
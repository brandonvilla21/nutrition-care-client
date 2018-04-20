import React, { Component, PropTypes } from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { Subheader, FlatButton } from 'material-ui';

class DietTableCalculator extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    render() {
      
      const { 
        onChangeTable, selectedFoods,
        handleOpenEliminationModal, onEdit,
       } = this.props;

      //Just for edit porpuses.
      let finalColumns = [
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
                min="0.0"
                step="any"
                type="number"
                value={original[EDITABLE_PROPERTY_ACCESORS.GRAMS]}
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
                min="0.0"
                step="any"
                type="number"
                value={original[EDITABLE_PROPERTY_ACCESORS.CALORIES]}
                onChange={onChangeTable.bind(this, original, EDITABLE_PROPERTY_ACCESORS.CALORIES)}
              />
            );
          },
          width: 200
        },
      ];

      if(onEdit === true) {

        finalColumns = [
          ...finalColumns,
          {
            Header: "Eliminar",
            id: "text",
            accessor: "",
            filterable: false,
            sortable: false,
            Cell: ({original}) => {
              return (
                <FlatButton 
                  label="X" 
                  secondary={true}
                  onClick={handleOpenEliminationModal.bind(this, original)}
                />
              );
            },
            minWidth: 70,
            maxWidth: 100,
          },
        ];

      }

      return(


          <div>
            <ReactTable
              data={selectedFoods}
              columns={[

                {
                  Header: <Subheader inset={true}>INTRODUCE LOS GRAMOS DE CADA UNO DE LOS ALIMENTOS QUE SELECCIONASTE</Subheader>,
                  columns: [
                    ...finalColumns
                  ]
                },
              ]}
              defaultPageSize={6}
              noDataText="SELECCIONA LOS ALIMENTOS EN LA TABLA ANTERIOR PARA CONTINUAR ;)"
            />
          </div>
        );
    }
}

DietTableCalculator.propTypes = {
  handleOpenEliminationModal: PropTypes.func,
  onChangeTable: PropTypes.func.isRequired,
  selectedFoods: PropTypes.array.isRequired,
  onEdit:        PropTypes.bool,
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
    accessor: "desiredProteins",
    maxWidth: 100    
    
  },
  {
    Header: "Carbohídratos",
    accessor: "desiredCarbohydrates",
    maxWidth: 115    
  },
  {
    Header: "Grasas",
    accessor: "desiredFats",
    maxWidth: 100    
  }
];

const EDITABLE_PROPERTY_ACCESORS = {
  GRAMS: 'desiredGrams',
  CALORIES: 'desiredCalories'
};
  
export default DietTableCalculator;
import React, { Component, PropTypes } from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { Subheader, FlatButton } from 'material-ui';

class FoodReportTable extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() { }

    render() {
      
      const { foods } = this.props;

      return(


          <div>
            <ReactTable
              sortable={false}
              data={foods}
              columns={[
                ...selectedFoodColumns
              ]}
              defaultPageSize={5}
              noDataText="No hay alimentos por desplegar"
            />
          </div>
        );
    }
}

FoodReportTable.propTypes = {
  foods: PropTypes.array.isRequired,
};


const selectedFoodColumns = [
  {
    Header: "Información general",
    headerStyle: { 
      fontSize: 16,
      fontStyle: 'italic',
      paddingBottom: 15
    },
    columns: [
      {
        Header: "ID",
        accessor: "id",
        maxWidth: 70
      },
      {
        Header: "Descripción",
        accessor: "description",
        minWidth: 150,
        style: { whiteSpace: 'normal' },
      },
    ]
  },
  {
    Header: "Por cada 100 gramos",
    headerStyle: { 
      fontSize: 16,
      fontStyle: 'italic',
      paddingBottom: 15
    },
    columns: [
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
      },
      {
        Header: "Calorías",
        accessor: "calories",
        maxWidth: 100    
      },
    ]
  }
  
];
  
export default FoodReportTable;
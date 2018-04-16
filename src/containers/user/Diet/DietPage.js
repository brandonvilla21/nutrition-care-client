import React, { Component } from 'react';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import ContentAdd from 'material-ui/svg-icons/content/add';
import urlConfig from '../../../url-config';
import { blue500, green600 } from 'material-ui/styles/colors';
import axios from 'axios';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { FloatingActionButton, IconButton } from 'material-ui';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import filterCaseInsensitive from '../../../shared/tableFiltering';

class DietPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diets: []
        };
    }

    componentDidMount() {
      this.getOwnDiets().then(diets => {
        diets.forEach( diet => 
          diet.register_date = new Date(diet.register_date).toLocaleDateString()
        );
        this.setState({ diets });
      });
    }

    getOwnDiets() {
      const url = `${urlConfig.baseUrl}/diets/userDiets`;
      const config = urlConfig.axiosConfig;
      config.method = 'GET';
      return axios.get(url, config)
          .then( response => response.data )
          .then( innerData => innerData.data )
          .catch( err => { throw err.response.data; } );
  }

    render() {

      const { diets } = this.state;

      return (
        <PageBase
          title="Tus dietas"
          navigation="Aplicación / Dietas"
        >
          <div>
            <Link to="/create-diet" >
                <FloatingActionButton style={styles.floatingActionButton} backgroundColor={green600}>
                    <ContentAdd />
                </FloatingActionButton>
            </Link>
            <ReactTable
              className="-striped -highlight"
              data={diets}
              filterable
              defaultFilterMethod={filterCaseInsensitive}
              columns={[
                ...columns,
                {
                  Header: "Editar",
                  id: "text",
                  accessor: "",
                  filterable: false,
                  sortable: false,
                  Cell: () => {
                    return (
                      <IconButton iconStyle={styles.editIconStyle}
                      >
                        <EditorModeEdit />
                      </IconButton>
                    );
                  },
                  maxWidth: 70
                },
              ]}
              defaultPageSize={10}
              noDataText="No hay datos registrados"
            />
          </div>
        </PageBase>
      );
      
    }

  }
export default DietPage;

const columns = [
  {
    Header: "Información general",
    headerStyle: { 
      fontSize: 16,
      fontStyle: 'italic',
      paddingBottom: 15
    },
    columns:[
      {
        Header: "ID",
        accessor: "id",
        maxWidth: 100
      },
      {
        Header: "Fecha de registro",
        accessor: "register_date",
        minWidth: 120
      },
      {
        Header: "Estado",
        accessor: "status",
        maxWidth: 120
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
    Header: "Totales",
    headerStyle: { 
      fontSize: 16,
      fontStyle: 'italic',
      paddingBottom: 15
    },
    columns: [
      {
        Header: "Carbohidratos",
        accessor: "totalCarbohydrates",
        maxWidth: 120
      },
      {
        Header: "Proteínas",
        accessor: "totalProteins",
        maxWidth: 120
      },
      {
        Header: "Grasas",
        accessor: "totalFats",
        maxWidth: 120
      },
    ]
  }
];

const styles = {
  floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 35,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
      zIndex: 1
  },
  editIconStyle: {
    color: blue500, 
    borderRadius: '25px'
  }
};
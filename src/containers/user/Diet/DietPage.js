import React, { Component } from 'react';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import ContentAdd from 'material-ui/svg-icons/content/add';
import urlConfig from '../../../url-config';
import { blue500, green600, blueGrey200 } from 'material-ui/styles/colors';
import axios from 'axios';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { FloatingActionButton, IconButton, Dialog, RaisedButton, FlatButton } from 'material-ui';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import filterCaseInsensitive from '../../../shared/tableFiltering';

class DietPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diets: [],
            openDeleteDialog: false,
            dietToDelete: {},
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


    handleDeleteDietDialogClose() {
      this.setState({ openDeleteDialog: false, dietToDelete:{} });
    }


    handleDeleteDietDialogOpen( dietToDelete ) {
      this.setState({ openDeleteDialog: true, dietToDelete });
    }

    
    deleteDiet() {

      this.deleteDietFromArray();
      this.deleteDietFromAPI();
    }


    deleteDietFromArray() {

      let diets = [ ...this.state.diets ];
      const index = diets.findIndex( element => element.id == this.state.dietToDelete.id );

      diets = [ ...diets.slice(0, index), ...diets.slice(index + 1) ];

      this.setState({ diets });

      this.handleDeleteDietDialogClose();

    }


    deleteDietFromAPI() {

        // const { diets } = this.state;
        // const url = `${urlConfig.baseUrl}/diets/${diets.id}`;
        // const config = urlConfig.axiosConfig;
        // config.method = 'DELETE';
  
        // axios.delete(url, config)
        //     .then( response => {
        //       if (response.status === 200) {
        //           console.log("todo bien, joven")
        //         } else 
        //             console.log("paso algo malo, joven")
        //     })
        //     .catch(err => {
        //       console.log("paso algo muy malo en el catch, joven")
        //       throw err.response.data.message;
        //     });
      
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
                  // Header: "Editar",
                  id: "text",
                  accessor: "",
                  filterable: false,
                  sortable: false,
                  Cell: ({original}) => {
                    return (
                      <Link to={`edit-diet/${original.id}`}>
                        <IconButton iconStyle={styles.editIconStyle}>
                          <EditorModeEdit />
                        </IconButton>
                    </Link>
                    );
                  },
                  maxWidth: 70
                },
                {
                  Header: "",
                  id: "text",
                  accessor: "",
                  filterable: false,
                  sortable: false,
                  Cell: ({original}) => {
                    return (
                        <IconButton 
                          onClick={this.handleDeleteDietDialogOpen.bind(this, original)}
                          iconStyle={styles.deleteIconStyle}>
                            
                            <ActionDelete />
                        
                        </IconButton>
                    );
                  },
                  maxWidth: 70
                },
              ]}
              defaultPageSize={10}
              noDataText="No hay datos registrados"
            />

            <Dialog
              title="AVISO"
              actions={[

                <RaisedButton
                  label="Cancelar"
                  secondary={true}
                  key={1} 
                  onClick={this.handleDeleteDietDialogClose.bind(this)}
                  />,

                <FlatButton 
                  label="Eliminar" 
                  secondary={true}
                  key={0}
                  onClick={this.deleteDiet.bind(this)}
                  />,
                
              ]}
              modal={true}
              open={this.state.openDeleteDialog}
            >
              ¿Estás seguro de eliminar esta dieta? Si lo haces, es muy probable
              que no puedas recuperarla más adelante.
            </Dialog>

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
        maxWidth: 70
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
      {
        Header: "Calorías",
        accessor: "totalCalories",
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
  },
  deleteIconStyle: {
    color: blueGrey200, 
    borderRadius: '25px'
  }
};
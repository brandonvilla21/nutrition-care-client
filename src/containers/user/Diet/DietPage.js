import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import urlConfig from '../../../url-config';
import { grey500, green600 } from 'material-ui/styles/colors';
import axios from 'axios';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { FloatingActionButton } from 'material-ui';
import CreateDietPage from './CreateDietPage';
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
          .catch( err => { throw err; } );
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
              data={diets}
              filterable
              defaultFilterMethod={filterCaseInsensitive}
              columns={[
                ...columns
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
    Header: "ID",
    accessor: "id",
    maxWidth: 100
  },
  {
    Header: "Carbohidratos",
    accessor: "totalCarbohydrates",
    minWidth: 120
  },
  {
    Header: "Proteínas",
    accessor: "totalProteins",
    minWidth: 120
  },
  {
    Header: "Grasas",
    accessor: "totalFats",
    minWidth: 120
  },
  {
    Header: "Estado",
    accessor: "status",
    minWidth: 120
  },
  {
    Header: "Fecha de registro",
    accessor: "register_date",
    minWidth: 120
  },
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
  }
};
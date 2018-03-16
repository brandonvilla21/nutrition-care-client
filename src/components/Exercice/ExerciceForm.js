import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import { TextField, Tabs, Tab } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FileBase64 from 'react-file-base64';
import { typography } from 'material-ui/styles';
import axios from 'axios';
import urlConfig from '../../url-config';
import 'react-table/react-table.css';
import { blue500 } from 'material-ui/styles/colors';
import SelectableTable from './SelectableTable';


class ExerciceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            base64_image: '',
            bodyAreas: [],
            selectedBodyAreas: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.toggleRow = this.toggleRow.bind(this);
    }


    componentWillMount() {
      this.getBodyAreas()
          .then(bodyAreas => {
            this.setState({ bodyAreas });
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
      event.preventDefault();
      const url = `${urlConfig.baseUrl}/exercises`;
      const config = urlConfig.axiosConfig;
      config.method = 'POST';


      const { name, base64_image, selectedBodyAreas } = this.state;
      let data = { name, base64_image, selectedBodyAreas };


      axios.post(url, data, config)
          .then( response => {
              if (response.status === 200) {
                  this.props.onSubmitted(true);
                  this.clearState();
              } else
                  this.props.onSubmitted(false);
          })
          .catch(() => this.props.onSubmitted(false));
    }


    getBodyAreas() {
        const url = `${urlConfig.baseUrl}/bodyareas`;
        return fetch(url)
            .then( data => data.json())
            .then( response => response.data);
    }


    getFiles( file ) {
        this.setState({ base64_image: file.base64 });
    }
    
    
    disableButton() {
        return  this.state.name === '' 
                || this.state.base64_image === ''
                || this.state.selectedBodyAreas.length === 0;
    }
    

    clearState() {
        this.setState({
            name: '',
            base64_image: '',
            // bodyAreas: [],
            selectedBodyAreas: [],
            selected: {}
        });
    }

    toggleRow(original) {
      
      let selectedBodyAreas = [
        ...this.state.selectedBodyAreas
      ];
      const elementIndex = selectedBodyAreas.findIndex( element => element.id == original.id );
      // check to see if the key exists
      if (elementIndex >= 0) {
        // it does exist so we will remove it using destructing
        selectedBodyAreas = [
          ...selectedBodyAreas.slice(0, elementIndex),
          ...selectedBodyAreas.slice(elementIndex + 1)
        ];

      } else {
        // it does not exist so add it
        selectedBodyAreas.push(original);
      }
      // update the state
      this.setState({ selectedBodyAreas });

    }


    render() {
        const { bodyAreas, selectedBodyAreas } = this.state;

        return(
            <PageBase
                title="Registrar un ejercicio"
                navigation="Alimentos / Registro">
                

                <form onSubmit={this.handleSubmit}>
                <TextField
                    hintText="Nombre"
                    floatingLabelText="Nombre"
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                    fullWidth={true} />


                <Tabs style={styles.tabs}>

                  <Tab style={styles.tab} label="Datos generales" >
                    <div>
                      <SelectableTable 
                        elements={bodyAreas}
                        selectedElements={selectedBodyAreas}
                        mainTableHeader="SELECCIONA UN ÁREA DEL CUERPO"
                        secondaryTableHeader="ÁREAS DEL CUERPO SELECCIONADAS"
                        defaultPageSize={5}
                        noDataTextMainTable="No hay datos actualmente :("
                        noDataTextSecondaryTable="Selecciona un elemento de la otra tabla ;)"
                        columns={columns}
                        onToggleRow={this.toggleRow}
                      />
                      
                    </div>
                  </Tab>
                  <Tab style={styles.tab} label="Seleccionar imagen" >
                    <div>
                      
                      <h3 style={styles.imageTitle}>Agrega una imagen</h3>

                      <FileBase64 
                          multiple={false}
                          onDone={this.getFiles}
                      />
                      
                      <div style={styles.imageDisplay}>
                        <img src={this.state.base64_image}/>
                      </div>


                    </div>
                  </Tab>
                </Tabs>

                <RaisedButton
                    label="Registrar ejercicio"
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

const columns = [
  {
    Header: "ID",
    accessor: "id",
    maxWidth: 100
  },
  {
    Header: "Descripción",
    accessor: "description"
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
    },
    tabs: {
      paddingTop: '18px'
    }
    // imageStyle: {
    //   width: ''
    // },
    // rowContainer: {
    //   display: 'flex'
    // }

};
  
export default ExerciceForm;
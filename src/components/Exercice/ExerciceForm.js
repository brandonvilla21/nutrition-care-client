import React, { Component, PropTypes } from 'react';
import PageBase from '../../components/PageBase';
import { TextField } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FileBase64 from 'react-file-base64';
import { typography } from 'material-ui/styles';
import axios from 'axios';
import urlConfig from '../../url-config';
import ReactTable from 'react-table';
import Divider from 'material-ui/Divider';
import 'react-table/react-table.css';
import Moment from 'moment';
import { Tabs, Tab } from "material-ui/";
import { blue500 } from 'material-ui/styles/colors';
import filterCaseInsensitive from '../../shared/tableFiltering';

class ExerciceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            base64_image: '',
            bodyAreas: [],
            selected: {},
            selection: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.disableButton = this.disableButton.bind(this);
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

      axios.post(url, this.state, config)
          .then( response => {
              if (response.status === 200) {
                  this.props.onSubmitted(true);
                  this.clearState();
              } else
                  this.props.onSubmitted(false);
          })
          .catch(() => this.props.onSubmitted(false));
    }


    componentWillMount() {
      this.getBodyAreas()
          .then(bodyAreas => {
            console.log(bodyAreas);
            this.setState({ bodyAreas })
          });
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
                || this.state.bodyAreas === [];
    }
    

    clearState() {
        this.setState({
            name: '',
            base64_image: '',
            bodyAreas: [],
            selection: [],
            selected: {}
        });
    }

    toggleRow(original) {
      
      let selection = [
        ...this.state.selection
      ];
      const elementIndex = selection.findIndex( element => element.id == original.id )
      // check to see if the key exists
      if (elementIndex >= 0) {
        // it does exist so we will remove it using destructing
        selection = [
          ...selection.slice(0, elementIndex),
          ...selection.slice(elementIndex + 1)
        ]
      } else {
        // it does not exist so add it
        selection.push(original);
      }
      // update the state
      this.setState({ selection });


      const newSelected = Object.assign({}, this.state.selected);
      newSelected[original.id] = !this.state.selected[original.id];
      this.setState({
        selected: newSelected,
      });


    }

    logSomething(event) {
      event.preventDefault();
      console.log('this.state.selected: ', this.state.selected);
      console.log('selection: ', this.state.selection);
    }

    render() {
        const { bodyAreas } = this.state;

        return(
            <PageBase
                title="Registrar un ejercicio"
                navigation="Alimentos / Registro">
                

                <form onSubmit={this.handleSubmit}>
                <button onClick={event => this.logSomething(event)}>Ira men</button>
                <TextField
                    hintText="Nombre"
                    floatingLabelText="Nombre"
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                    fullWidth={true} />


                <Tabs style={styles.tabs}>

                  <Tab style={styles.tab} label="Seleccionar datos generales" >
                    <div>

                      <br/>

                      <ReactTable
                        filterable
                        defaultFilterMethod={filterCaseInsensitive}
                        style={{width: '100%'}}
                        data={bodyAreas}
                        columns={[
                          {
                            id: "checkbox",
                            accessor: "",
                            filterable: false,
                            sortable: false,
                            Cell: ({ original }) => {
                              return (
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  checked={this.state.selected[original.id] === true}
                                  onChange={() => this.toggleRow(original)}
                                />
                              );
                            },
                            width: 45
                          },
                          {
                            Header: "ID",
                            accessor: "id",
                            maxWidth: 100
                          },
                          {
                            Header: "Descripción",
                            accessor: "description"
                          }
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
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
                        
                    {/* </div> */}

                {/* <Divider/> */}

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
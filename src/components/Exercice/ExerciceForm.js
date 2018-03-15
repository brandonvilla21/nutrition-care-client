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
// var moment = require('moment');

class ExerciceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            base64_image: '',
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
            base64_image: ''
        });
    }

    render() {
        const { bodyAreas } = this.state;

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

                  <Tab style={styles.tab} label="Seleccionar datos generales" >
                    <div>

                      <br/>

                      <ReactTable
                        filterable
                        style={{width: '100%'}}
                        data={bodyAreas}
                        columns={[
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
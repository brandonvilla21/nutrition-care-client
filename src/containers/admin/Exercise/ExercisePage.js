import React, { Component } from 'react';
import { green600, grey500 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import { Table, TableRow, TableRowColumn, FloatingActionButton, TableHeader, TableBody } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import urlConfig from '../../../url-config';
import Image from 'material-ui-image';

class ExercisePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercices: []
        };
    }

    componentWillMount() {
        this.getExercices()
            .then(exercices => this.setState({ exercices }));
    }

    getExercices() {
        const url = `${urlConfig.baseUrl}/exercises`;
        return fetch(url)
            .then( data => data.json())
            .then( response => response.data);
    }

    renderRows() {
        return this.state.exercices.map( exercice => 
            <TableRow key={exercice.id}>
                <TableRowColumn style={styles.columns.image} >
                    <Image 
                        src={`${urlConfig.imageDir}/${exercice.srcImage}`}
                        color="white"
                        style={styles.image}
                    />
                </TableRowColumn>
                <TableRowColumn style={{...styles.columns.name, ...styles.biggerFont}} >{exercice.name}</TableRowColumn>
                <TableRowColumn style={{...styles.columns.date, ...styles.biggerFont}} >{exercice.created_at.date.substring(0,11)}</TableRowColumn>
            </TableRow>
        );
    }

    render() {
        return(
            <PageBase
                title="Ejercicios"
                navigation="Aplicación / Ejercicios">
                <div>
                <Link to="/create-exercise" >
                    <FloatingActionButton style={styles.floatingActionButton} backgroundColor={green600}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>

                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={styles.columns.image}>Imagen</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.name}>Nombre</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.date}>Fecha de creación</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.renderRows()}
                    </TableBody>
                </Table>
                </div>
                
            </PageBase>
        );
    }
}
const styles = {
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    image: {
        width: 'auto'
    },
    biggerFont: {
        fontSize: '1.3em'
    },
    columns: {
        image: {
            width: '30%'
        },
        name: {
            width: '35%',
            textAlign: 'center'
        },
        edit: {

        },
        date: {
            width: '35%',
            textAlign: 'center'
        }
    },
    editButton: {
        fill: grey500
    },
};
export default ExercisePage;
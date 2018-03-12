import React, { Component } from 'react';
import { green600, grey500 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import { Table, TableRow, TableRowColumn, FloatingActionButton, TableHeader, TableBody } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import urlConfig from '../../../url-config';

class TypeRoutinePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeRoutines: []
        };
    }

    componentWillMount() {
        this.getTypeRoutines()
            .then(typeRoutines => this.setState({ typeRoutines }));
    }

    getTypeRoutines() {
        const url = `${urlConfig.baseUrl}/typeroutines`;
        return fetch(url)
            .then( data => data.json())
            .then( response => response.data);
    }

    renderRows() {
        return this.state.typeRoutines.map( typeRoutine => 
            <TableRow key={typeRoutine.id}>
                <TableRowColumn style={{...styles.columns.description, ...styles.biggerFont}} >{typeRoutine.description}</TableRowColumn>
                <TableRowColumn style={{...styles.columns.date, ...styles.biggerFont}} >{typeRoutine.created_at.date.substring(0,11)}</TableRowColumn>
            </TableRow>
        );
    }

    render() {
        return(
            <PageBase
                title="Tipos de rutinas"
                navigation="Aplicación / Tipos de rutinas">
                
                <div>
                    <Link to="/create-type-routine" >
                        <FloatingActionButton style={styles.floatingActionButton} backgroundColor={green600}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </Link>

                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={styles.columns.description}>Descripción</TableHeaderColumn>
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
    biggerFont: {
        fontSize: '1.3em'
    },
    columns: {
        description: {
            width: '50%',
            textAlign: 'center'
        },
        date: {
            width: '50%',
            textAlign: 'center'
        }
    },
    editButton: {
        fill: grey500
    },
};
export default TypeRoutinePage;
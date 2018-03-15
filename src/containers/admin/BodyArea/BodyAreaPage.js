import React, { Component } from 'react';
import { green600, grey500 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import { Table, TableRow, TableRowColumn, FloatingActionButton, TableHeader, TableBody } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import urlConfig from '../../../url-config';

class BodyAreaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyAreas: []
        };
    }

    componentWillMount() {
        this.getBodyAreas()
            .then(bodyAreas => this.setState({ bodyAreas }));
    }

    getBodyAreas() {
        const url = `${urlConfig.baseUrl}/bodyareas`;
        return fetch(url)
            .then( data => data.json())
            .then( response => response.data);
    }

    renderRows() {
        return this.state.bodyAreas.map( bodyArea => 
            <TableRow key={bodyArea.id}>
                <TableRowColumn style={{...styles.columns.description, ...styles.biggerFont}} >{bodyArea.description}</TableRowColumn>
                <TableRowColumn style={{...styles.columns.date, ...styles.biggerFont}} >{bodyArea.created_at.substring(0,11)}</TableRowColumn>
            </TableRow>
        );
    }

    render() {
        return(
            <PageBase
                title="Áreas del cuerpo para filtrar ejercicios"
                navigation="Aplicación / Áreas del cuerpo">
                
                <div>
                    <Link to="/create-body-areas" >
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
export default BodyAreaPage;
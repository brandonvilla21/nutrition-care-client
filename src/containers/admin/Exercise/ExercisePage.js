import React, { Component } from 'react';
import { green600 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import { Table, TableRow, FloatingActionButton, TableHeader } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';

class ExercisePage extends Component {
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
                            <TableHeaderColumn>Imagen</TableHeaderColumn>
                            <TableHeaderColumn>Descripción</TableHeaderColumn>
                        </TableRow>
                        {/* <TableBody>

                        </TableBody> */}
                    </TableHeader>
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
    }
};
export default ExercisePage;
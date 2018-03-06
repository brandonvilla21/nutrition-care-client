import React, { Component } from 'react';
import { green600 } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import { Table, TableRow, FloatingActionButton, TableHeader } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';

class FoodPage extends Component {
    render() {
        return(
            <PageBase
                title="Alimentos"
                navigation="Aplicación / Alimentos">
                <div>
                <Link to="/create-food" >
                    <FloatingActionButton style={styles.floatingActionButton} backgroundColor={green600}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Link>

                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={styles.columns.description} >Descripción</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.carbs} >Carbohidratos</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.proteins} >Proteínas</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.fats} >Grasas</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.calories} >Calorías</TableHeaderColumn>
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
    link: {
        textDecoration: 'none'
    },
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    columns: {
        description: {
          width: '20%'
        },
        carbs: {
          width: '20%'
        },
        proteins: {
          width: '20%'
        },
        fats: {
          width: '20%'
        },
        calories: {
          width: '20%'
        }
    }
};
export default FoodPage;
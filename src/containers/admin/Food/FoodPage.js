import React, { Component } from 'react';
import { Link } from 'react-router';
import PageBase from '../../../components/PageBase';
import { Table, TableBody, TableRow, FloatingActionButton, TableHeader, TableRowColumn } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import urlConfig from '../../../url-config';
import { grey500, green600 } from 'material-ui/styles/colors';

class FoodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foods: []
        };
        this.renderRows = this.renderRows.bind(this);
    }

    componentWillMount() {
        this.getFoods()
            .then(foods => this.setState({foods}));
    }

    getFoods() {
        const url = `${urlConfig.baseUrl}/foods`;
        return fetch(url)
            .then( data => data.json())
            .then( response => response.data);
    }

    renderRows() {
        return this.state.foods.map(food => 
            <TableRow key={food.id}>
                <TableRowColumn style={styles.columns.description} >{food.description}</TableRowColumn>
                <TableRowColumn style={styles.columns.carbs} >{food.carbohydrates}</TableRowColumn>
                <TableRowColumn style={styles.columns.proteins} >{food.proteins}</TableRowColumn>
                <TableRowColumn style={styles.columns.fats} >{food.fats}</TableRowColumn>
                <TableRowColumn style={styles.columns.calories} >{food.calories}</TableRowColumn>
            </TableRow>);
    }
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
                    </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}>
                            {this.renderRows()}
                        </TableBody>
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
          width: '50%',
        },
        carbs: {
          width: '10%',
          textAlign: 'center'
        },
        proteins: {
          width: '10%',
          textAlign: 'center'
        },
        fats: {
          width: '10%',
          textAlign: 'center'
        },
        calories: {
          width: '10%',
          textAlign: 'center'
        },
        edit: {
          width: '10%',
          textAlign: 'center'
        }
    },
    editButton: {
        fill: grey500
    },
};
export default FoodPage;
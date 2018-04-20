import React, { PropTypes } from 'react';
import {
    Table,
    TableHeader,
    TableRow,
    TableHeaderColumn,
    TableBody, 
    TableRowColumn} from 'material-ui';

const ProgressTable = (props) => {
    const { progresses, onHeaderClick } = props;
    
    const renderRows = () => {
        return progresses.map( progress => 
            <TableRow key={progress.id}>
                <TableRowColumn>{progress.progress_date}</TableRowColumn>
                <TableRowColumn>{progress.weight}</TableRowColumn>
                <TableRowColumn>{progress.fat_percentage}</TableRowColumn>
                <TableRowColumn>{progress.muscle_kilogram}</TableRowColumn>
                <TableRowColumn>{progress.fat_kilogram}</TableRowColumn>
            </TableRow>
        );
    };

    return(
        <div>
            <Table>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>
                            Fecha
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <a style={styles.aStyle} onClick={() => {onHeaderClick('weight', 'Peso');}}>Peso</a>
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <a style={styles.aStyle} onClick={() => {onHeaderClick('fat_percentage', '% de Grasa');}}>% de Grasa</a>
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <a style={styles.aStyle} onClick={() => {onHeaderClick('muscle_kilogram', 'Kg de Músculo');}}>Kg de Músculo</a>
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                            <a style={styles.aStyle} onClick={() => {onHeaderClick('fat_kilogram', 'Kg de Grasa');}}>Kg de Grasa</a>
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {renderRows()}
                </TableBody>
            </Table>
        </div>
    );
};

const styles = {
    aStyle: {
        cursor: 'pointer'
    }
};

ProgressTable.propTypes = {
    progresses: PropTypes.array,
    onHeaderClick: PropTypes.func,
};

export default ProgressTable;

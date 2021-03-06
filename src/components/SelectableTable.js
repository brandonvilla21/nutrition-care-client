import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table';
import { Subheader, Checkbox } from 'material-ui';
import filterCaseInsensitive from '../shared/tableFiltering';


class SelectableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };

  }


  componentWillReceiveProps() {
    if(this.props.resetToggle === true) 
      this.resetToogle();

    if( this.props.manualRemovedFood && Object.keys(this.props.manualRemovedFood).length > 0) {

      const currentSelected = Object.assign({}, this.state.selected);
      this.setState({
          selected: { ...currentSelected, ...this.props.manualRemovedFood }
        }, 
        () => this.props.clearManualRemovedFoodState());
    }

    // console.log("gg");
    


  }


  resetToogle() {
      this.setState({ selected: {} });
  }


  handleStateCheckboxs(original) {
      
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[original.id] = !this.state.selected[original.id];
    
    this.setState({ selected: newSelected });

    this.props.onToggleRow(original);

  }


  render() {
    const { 
      elements, selectedElements, mainTableHeader,
      secondaryTableHeader, defaultPageSize, noDataTextMainTable,
      columns, noDataTextSecondaryTable, enableSecondaryTable
     } = this.props;

    let secondaryTable = null;

    if(enableSecondaryTable) {
      secondaryTable = (
       <div>
        <br />
        <br />
        <ReactTable
          filterable={false}
          sortable={false}
          data={selectedElements}
          columns={[
            {
              Header: <Subheader inset={true}>{secondaryTableHeader}</Subheader>,
              columns: [
                ...columns
              ]
            }
          ]


          }
          defaultPageSize={5}
          className="-striped -highlight"
          noDataText={noDataTextSecondaryTable}

        />
       </div>
      );
       
    }

    return (
      <div>

        <ReactTable
          filterable
          defaultFilterMethod={filterCaseInsensitive}
          data={elements}
          columns={[

            {
              Header: <Subheader inset={true}>{mainTableHeader}</Subheader>,
              columns: [
                {
                  id: "checkbox",
                  accessor: "",
                  filterable: false,
                  sortable: false,
                  Cell: ({ original }) => {
                    return (
                      <Checkbox
                        checked={this.state.selected[original.id] === true}
                        onCheck={() => this.handleStateCheckboxs(original)}
                      />
                    );
                  },
                  width: 45
                },
                
                ...columns

              ]
            }


          ]}
          defaultPageSize={defaultPageSize}
          className="-striped -highlight"
          noDataText={noDataTextMainTable}
        />

        {secondaryTable}

      </div>
    );
  }
}

SelectableTable.propTypes = {
  elements:                    PropTypes.array.isRequired,
  selectedElements:            PropTypes.array.isRequired,
  columns:                     PropTypes.array.isRequired,
  mainTableHeader:             PropTypes.string.isRequired,
  noDataTextMainTable:         PropTypes.string.isRequired,
  defaultPageSize:             PropTypes.number.isRequired,
  onToggleRow:                 PropTypes.func.isRequired,
  resetToggle:                 PropTypes.bool,
  manualRemovedFood:           PropTypes.object,
  clearManualRemovedFoodState: PropTypes.func,

  enableSecondaryTable:     PropTypes.bool.isRequired,
  noDataTextSecondaryTable: function(props, propName) {
    if ((props['enableSecondaryTable'] === true && (props[propName] === undefined || typeof(props[propName]) !== 'string'))) {
        return new Error('Please provide a noDataTextSecondaryTable value!');
    }
  },
  secondaryTableHeader: function(props, propName) {
    if ((props['secondaryTableHeader'] === true && (props[propName] === undefined || typeof(props[propName]) !== 'string'))) {
        return new Error('Please provide a secondaryTableHeader value!');
    }
  },
};

export default SelectableTable;
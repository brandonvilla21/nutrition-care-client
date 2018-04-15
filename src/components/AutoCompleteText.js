import React, { PropTypes }from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const AutoCompleteText = props => {
    return (
        <div>
            <AutoComplete
                hintText={props.hintText}
                searchText={props.searchText}
                onUpdateInput={props.onUpdateInput}
                dataSource={props.dataSource}
                filter={props.filter}
                openOnFocus={props.openOnFocus}
                maxSearchResults={props.maxSearchResults}
                dataSourceConfig={props.dataSourceConfig}
            />
        </div>
    );
};

AutoCompleteText.propTypes = {
    hintText: PropTypes.string,
    searchText: PropTypes.string,
    onUpdateInput: PropTypes.func,
    dataSource: PropTypes.array,
    filter: PropTypes.func,
    openOnFocus: PropTypes.bool,
    maxSearchResults: PropTypes.number,
    dataSourceConfig: PropTypes.func
};

export default AutoCompleteText;
import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, RaisedButton } from 'material-ui';
import SelectableTable from '../../SelectableTable';
import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import AvPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import DietTableCalculator from './DietTableCalculator';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

import { blue500 } from 'material-ui/styles/colors';

import DietTotalsCard from './DietTotalsCard/DietTotalsCard';
class TabsDiet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };

    this.nextIndex = this.nextIndex.bind(this);
    this.prevIndex = this.prevIndex.bind(this);
    this.blockTapTabs = this.blockTapTabs.bind(this);
    
  }


  nextIndex() {
    const { tabIndex } = this.state;
    this.setState({ tabIndex: tabIndex + 1 });
  }


  prevIndex() {
      const { tabIndex } = this.state;
      this.setState({ tabIndex: tabIndex - 1 });
  }


  blockTapTabs() {
    const { tabIndex } = this.state;
    this.setState({ tabIndex });
  }


  disableCalculateDietButton() {
    return this.props.selectedFoods.length < 1;
  }


  render () {

    const { 
      foods, selectedFoods, totalCalories, 
      totalCarbohydrates, totalFats, totalProteins,
      selectableFoodColumns
    } = this.props;

    return (
      <Tabs 
        value={this.state.tabIndex}
        disabled={true}
        onChange={this.blockTapTabs}
        initialSelectedIndex={0} 
        style={styles.tabs}
        >

        <Tab 
          icon={<ActionShoppingBasket />}
          value={0}
          style={styles.tab} label="Alimentos disponibles">
          <div>

            <br/>
            
            <SelectableTable 
              elements={foods}
              selectedElements={selectedFoods}
              mainTableHeader="SELECCIONA LOS ALIMENTOS QUE DESEAS AGREGAR A TU DIETA :)"
              secondaryTableHeader="ALIMENTOS SELECCIONADOS"
              defaultPageSize={10}
              noDataTextMainTable="No hay datos actualmente :("
              noDataTextSecondaryTable="Selecciona un elemento de la otra tabla ;)"
              columns={selectableFoodColumns}
              onToggleRow={this.props.toggleRow.bind(this)}
              enableSecondaryTable={false}
            />

            <RaisedButton
                    style={styles.raisedButtonNextStyle}
                    label="Siguiente"
                    primary={true}
                    disabled={this.disableCalculateDietButton()}
                    value={1}
                    onClick={this.nextIndex} />
            
          </div>
        </Tab>

        <Tab 
          style={styles.tab} label="Estos son tus alimentos seleccionados para tu dieta :)"
          value={1}
          icon={<AvPlaylistAddCheck style={styles.iconStyles} color={blue500} />}>
          <div>

            <DietTableCalculator 
              selectedFoods={selectedFoods}
              onChangeTable={this.props.onChangeDataTableFields.bind(this)}
            />

            <DietTotalsCard
              totalCalories={totalCalories}
              totalCarbohydrates={totalCarbohydrates}
              totalFats={totalFats}
              totalProteins={totalProteins}
            />

            <div>
              <RaisedButton
                      style={styles.raisedButtonPrevStyle}
                      label="Regresar"
                      secondary={true}
                      disabled={this.disableCalculateDietButton()}
                      value={1}
                      onClick={this.prevIndex} />

              <RaisedButton
                      style={styles.raisedButtonNextStyle}
                      label="Siguiente"
                      primary={true}
                      disabled={this.disableCalculateDietButton()}
                      value={1}
                      onClick={this.nextIndex} />
            </div>

          </div>
        </Tab>

        <Tab
            icon={<CheckCircle />}
            label="Finalizar"
            value={2}
            style={styles.tab}
          >
            <div>
              <p>
              Te pedimos que confirmes los datos antes de continuar. 
              Cuando estés listo, da clic en 
                  <strong> Guardar</strong>
              </p>
              <DietTotalsCard
                totalCalories={totalCalories}
                totalCarbohydrates={totalCarbohydrates}
                totalFats={totalFats}
                totalProteins={totalProteins}
              />
              <div style={styles.raisedButtonContainer}>
                <RaisedButton
                  style={styles.raisedButtonPrevStyle}
                  label="Regresar"
                  secondary={true}
                  disabled={this.disableCalculateDietButton()}
                  value={1}
                  onClick={this.prevIndex} />

                <RaisedButton
                  style={styles.raisedButtonNextStyle}
                  label="Guardar"
                  primary={true}
                  onClick={this.props.onSubmitDiet} />
              </div>  
            
            </div>
          </Tab>

      </Tabs>
    );
  }
}


TabsDiet.propTypes = {
  foods: PropTypes.array.isRequired,
  selectedFoods: PropTypes.array.isRequired,
  selectableFoodColumns: PropTypes.array.isRequired,  
  totalCalories: PropTypes.number.isRequired,
  totalCarbohydrates: PropTypes.number.isRequired,
  totalProteins: PropTypes.number.isRequired,
  totalFats: PropTypes.number.isRequired,
  toggleRow: PropTypes.func.isRequired,
  onChangeDataTableFields: PropTypes.func.isRequired,
  onSubmitDiet: PropTypes.func.isRequired,
};


const styles = {
  tab: {
    backgroundColor: blue500,
    inkBarStyle: {
      backgroundColor: 'white'
    }
  },
  tabs: {
    borderRadius: '10px red',
    paddingTop: '18px'
  },
  iconStyles: {
    marginRight: 24,
  },
  raisedButtonNextStyle: {
    marginTop: 20,
    float: 'right'
  },
  raisedButtonPrevStyle: {
    marginTop: 20,
    float: 'left'
  }
};

export default TabsDiet;
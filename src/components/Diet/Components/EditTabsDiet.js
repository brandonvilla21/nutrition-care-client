import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, RaisedButton, Dialog, FlatButton } from 'material-ui';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ActionHelp from 'material-ui/svg-icons/action/help';
import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import AvPlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import TextField from 'material-ui/TextField/TextField';
import { blue500, grey700 } from 'material-ui/styles/colors';

import DietTotalsCard from './DietTotalsCard/DietTotalsCard';
import DietTableCalculator from './DietTableCalculator';
import SelectableTable from '../../SelectableTable';

class EditTabsDiet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1,
      resetToggle: false,
      openModalElimination: false,
    };

    this.nextIndex = this.nextIndex.bind(this);
    this.prevIndex = this.prevIndex.bind(this);
    this.blockTapTabs = this.blockTapTabs.bind(this);
    this.resetIndex = this.resetIndex.bind(this);
    this.handleCloseEliminationModal = this.handleCloseEliminationModal.bind(this);
    this.handleOpenEliminationModal = this.handleOpenEliminationModal.bind(this);
    this.handleRemoveRow = this.handleRemoveRow.bind(this);
  }

  handleCloseEliminationModal() {
    this.setState({
      openModalElimination: false, 
      selectedFoodToEliminate: {},
    });
  }

  handleOpenEliminationModal( elementToEliminate ) {
    this.setState({
      openModalElimination: true,
      selectedFoodToEliminate: elementToEliminate,
    });
  }

  handleRemoveRow() {
    this.props.removeFoodRow(this.state.selectedFoodToEliminate);
    this.setState({
      openModalElimination: false, 
      selectedFoodToEliminate: {},
    });
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


  disableSaveButton() {
    return this.props.description === '';
  }


  resetIndex() {
    this.setState({ tabIndex: 1, resetToggle: true }, 
                  () => this.setState({ resetToggle: false }));
  }

  render () {

    const { 
      foods, selectedFoods, totalCalories, 
      totalCarbohydrates, totalFats, totalProteins,
      selectableFoodColumns, description, onChange
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

            <Card initiallyExpanded={true} style={styles.recomendationStyles}>
              <CardHeader 
                title="Aviso"
                subtitle="Recomendaciones"
                actAsExpander={true}
                showExpandableButton={true}
                avatar={<ActionHelp style={styles.actionHelpStyle}/>}
              />
              <CardText expandable={true} style={{ color: grey700, fontSize: 16 }}>
                <ul>
                  <li>
                    Selecciona los alimentos que quieras incorporar en tu dieta.
                  </li>
                  <li>
                    Puedes seleccionar todos los alimentos que quieras en la tabla de alimentos
                    de abajo.
                  </li>
                </ul>
              </CardText>
            </Card>
            
            <SelectableTable
              resetToggle={this.state.resetToggle} 
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
          style={styles.tab} label="Alimentos seleccionados"
          value={1}
          icon={<AvPlaylistAddCheck style={styles.iconStyles} color={blue500} />}>
          <div>

            <Card initiallyExpanded={true} style={styles.recomendationStyles}>
              <CardHeader 
                title="Aviso"
                subtitle="Recomendaciones"
                actAsExpander={true}
                showExpandableButton={true}
                avatar={<ActionHelp style={styles.actionHelpStyle}/>}
              />
              <CardText expandable={true} style={{ color: grey700, fontSize: 16 }}>
                <ul>
                  <li>
                    Elige los gramos o calorías que deseas agregar para cada alimento de la tabla.
                  </li>
                  <li>
                    Ten en cuenta el valor total de cada uno de los macronutrientes de la tabla,
                    así como también de las calorías totales.
                  </li>
                </ul>
              </CardText>
            </Card>

            <DietTableCalculator
              selectedFoods={selectedFoods}
              onChangeTable={this.props.onChangeDataTableFields.bind(this)}
              handleOpenEliminationModal={this.handleOpenEliminationModal}
              onEdit={true}              
            />

            <Dialog
              title="AVISO"
              actions={[

                <RaisedButton
                  // style={styles.raisedButtonNextStyle}
                  label="Cancelar"
                  secondary={true}
                  key={1} onClick={this.handleCloseEliminationModal.bind(this)}
                  />,

                <FlatButton 
                  label="Eliminar" 
                  secondary={true}
                  key={0}
                  onClick={this.handleRemoveRow.bind(this)}/>,
                
              ]}
              modal={true}
              open={this.state.openModalElimination}
              onRequestClose={this.handleCloseEliminationModal}
            >
              ¿Estás seguro de eliminar esta comida? Si lo haces, es muy probable
              que no puedas recuperarla más adelante.
            </Dialog>

            <DietTotalsCard
              totalCalories={totalCalories}
              totalCarbohydrates={totalCarbohydrates}
              totalFats={totalFats}
              totalProteins={totalProteins}
            />

            <div>
              <RaisedButton
                      style={styles.raisedButtonPrevStyle}
                      label="Agregar más alimentos a la dieta"
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

            <TextField
              floatingLabelStyle={styles.floatingLabelStyle}
              name="description"
              floatingLabelText="Agrega una descripción para tu dieta"
              fullWidth={true}
              value={description}
              onChange={onChange}
            />
              <div className="final-grid">

                <DietTotalsCard className="totals-card"
                  totalCalories={totalCalories}
                  totalCarbohydrates={totalCarbohydrates}
                  totalFats={totalFats}
                  totalProteins={totalProteins}
                />

                {/* <Card className="recommendation-card" initiallyExpanded={true}>
                  <CardHeader 
                    title="Aviso"
                    subtitle="Recomendaciones"
                    actAsExpander={true}
                    showExpandableButton={true}
                    avatar={<ActionHelp style={styles.actionHelpStyle}/>}
                  />
                  <CardText expandable={true}>
                    <strong>AQUÍ VAN LAS RECOMENDACIONES</strong>
                  </CardText>
                </Card> */}

                <div>
                  <p>
                    Te pedimos que confirmes los datos antes de continuar. 
                    Cuando estés listo, da clic en 
                      <strong> Guardar</strong>
                  </p>
                  <RaisedButton
                    style={styles.raisedButtonPrevStyle}
                    label="Regresar"
                    secondary={true}
                    disabled={this.disableCalculateDietButton()}
                    value={1}
                    onClick={this.prevIndex} />

                  <RaisedButton
                    style={styles.raisedButtonNextStyle}
                    label="Editar dieta"
                    primary={true}
                    disabled={this.disableSaveButton()}
                    onClick={this.props.onSubmitDiet.bind(this, this.resetIndex)} />
                </div> 

              </div>
              
               
            
            </div>
          </Tab>

      </Tabs>
    );
  }
}


EditTabsDiet.propTypes = {
  foods: PropTypes.array.isRequired,
  selectedFoods: PropTypes.array.isRequired,
  selectableFoodColumns: PropTypes.array.isRequired,  
  totalCalories: PropTypes.number.isRequired,
  totalCarbohydrates: PropTypes.number.isRequired,
  totalProteins: PropTypes.number.isRequired,
  totalFats: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  toggleRow: PropTypes.func.isRequired,
  onChangeDataTableFields: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitDiet: PropTypes.func.isRequired,
  removeFoodRow: PropTypes.func.isRequired,
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
  },
  actionHelpStyle: {
    marginTop: 10, 
    color: grey700
  },
  recomendationStyles: {
    margin: '10px 0px 10px 0px'
  },
  floatingLabelStyle: {
    fontSize: 19,
  }
};

export default EditTabsDiet;
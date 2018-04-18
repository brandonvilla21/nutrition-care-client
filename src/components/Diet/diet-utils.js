
/**
 * 
 * Generic React's method to hangle changes for simple inputs.
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * @param event - The event that contains the value's and name's input.
 */
export function handleChange( event ) {
  const name = event.target.name;
  const value = event.target.value;

  this.setState({
      [name]: value
  });
}


/**
 * 
 * Calculates the 'totalCalories', 'totalCarbohydrates', 'totalFats',
 * 'totalProteins' based on the current value from the selectedFoods array
 * that is on the 'this.state' object. (Tt is recommended to use it along with
 * a 'debounce' function in order to avoid immediate heavy calculations every time
 * a value from the 'selectedFoods' array changed).
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 */
export function onRecalculateTotals() {

  const selectedFoods = [ ...this.state.selectedFoods ];

    const totals = 
      selectedFoods
        .reduce((accumulator, currentFood) => {
          return { 
            totalCalories: roundNumber(currentFood.desiredCalories + accumulator.totalCalories),
            totalCarbohydrates: roundNumber(currentFood.desiredCarbohydrates + accumulator.totalCarbohydrates ),
            totalFats: roundNumber( currentFood.desiredFats + accumulator.totalFats ),
            totalProteins: roundNumber( currentFood.desiredProteins + accumulator.totalProteins ),
          };
        },
        { totalCalories: 0, totalCarbohydrates: 0, totalFats: 0, totalProteins: 0 }
      );

    const { totalCalories, totalCarbohydrates, totalFats, totalProteins } = totals;

    this.setState({ totalCalories, totalCarbohydrates, totalFats, totalProteins });

}

/**
 * 
 * Synchronizes the SelectedTable component that holds all the foods and selectedFoods
 * with the 'this.state.selectedFoods' array on the state object.
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * @param currentSelectedObject - The object (in this case a food) that is being selected.
 */
export function toggleRow(currentSelectedObject) {
      
  let selectedFoods = [
    ...this.state.selectedFoods
  ];
  const elementIndex = selectedFoods.findIndex( element => element.id == currentSelectedObject.id );
  // check to see if the key exists
  if (elementIndex >= 0) {
    // it does exist so we will remove it using destructing
    selectedFoods = [
      ...selectedFoods.slice(0, elementIndex),
      ...selectedFoods.slice(elementIndex + 1)
    ];

  } else {
    // it does not exist so add it
    selectedFoods.push(currentSelectedObject);
  }
  // update the state
  this.setState({ selectedFoods });

}

/**
 * 
 * Synchronizes the SelectedTable component that holds all the foods and selectedFoods
 * with the 'this.state.selectedFoods' array on the state object.
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * @param currentSelectedObject - The object (in this case a food) that is being selected.
 * @param accessor - The key in which is based the calculations from all the other 
 * remaining properties/columns in the current selected object/row from the 
 * SelectedTable component.
 * ( Accepted values: desiredCalories | desiredGrams ).
 * @param event - The event that contains the value's input from the Grams and Calories inputs
 * in every single row from the DietTableCalculator component.
 */
export function onChangeDataTableFields(currentSelectedObject, accessor, event) {

  const value = event.target.value;
  const selectedFoods = [ ...this.state.selectedFoods ];
  const index = selectedFoods.findIndex( element => element.id == currentSelectedObject.id );


  selectedFoods[index][accessor] = Number(value);

  //Calculate remaining columns.
  const current = selectedFoods[index];

  this.calculateDataTableData( current, accessor );
  
  this.setState({ selectedFoods });

}


/**
 * 
 * Makes the proper calculation for the 'desiredProteins', 'desiredCarbohydrates',
 * 'desiredFats', 'desiredGrams' and 'desiredCalories' depending on the accessor property.
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * @param current - The object (in this case a food) that is being selected on the SelectableTable
 * component.
 * @param accessor - The key in which is based the calculations from all the other 
 * remaining properties/columns in the current selected object/row from the 
 * SelectedTable component.
 * ( Accepted values: desiredCalories | desiredGrams ).
 */
export function calculateDataTableData( current, accessor ) {

  if( accessor === 'desiredCalories' ) {

    current.desiredProteins = roundNumber((current.proteins / current.calories) * current[accessor]);
    current.desiredCarbohydrates = roundNumber((current.carbohydrates / current.calories) * current[accessor]);
    current.desiredFats = roundNumber((current.fats / current.calories) * current[accessor]);
    current.desiredGrams = roundNumber((1 / current.calories) * current[accessor]);

  } else {//accessor is equals to desiredGrams
    
    current.desiredProteins = roundNumber(current.proteins * current[accessor]);
    current.desiredFats = roundNumber(current.fats * current[accessor]);
    current.desiredCarbohydrates = roundNumber(current.carbohydrates * current[accessor]);
    current.desiredCalories = roundNumber(current.calories * current.desiredGrams);
  
  }

}


/**
 * 
 * Rounded decimals from float numbers and only allows them to have two decimals.
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * @param num - Number to round.
 * @returns number - Rounded number.
 */
export function roundNumber( num ) { return Math.round(num * 100) / 100; }
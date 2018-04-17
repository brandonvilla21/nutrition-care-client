export function handleChange( event ) {
  const name = event.target.name;
  const value = event.target.value;

  this.setState({
      [name]: value
  });
};


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

};

export function toggleRow(original) {
      
  let selectedFoods = [
    ...this.state.selectedFoods
  ];
  const elementIndex = selectedFoods.findIndex( element => element.id == original.id );
  // check to see if the key exists
  if (elementIndex >= 0) {
    // it does exist so we will remove it using destructing
    selectedFoods = [
      ...selectedFoods.slice(0, elementIndex),
      ...selectedFoods.slice(elementIndex + 1)
    ];

  } else {
    // it does not exist so add it
    selectedFoods.push(original);
  }
  // update the state
  this.setState({ selectedFoods });

}

export function onChangeDataTableFields(original, accessor, event) {

  const value = event.target.value;
  const selectedFoods = [ ...this.state.selectedFoods ];
  const index = selectedFoods.findIndex( element => element.id == original.id );


  selectedFoods[index][accessor] = Number(value);

  //Calculate remaining columns.
  const current = selectedFoods[index];

  this.calculateDataTableData( current, accessor );
  
  this.setState({ selectedFoods });

}


export function roundNumber( num ) { return Math.round(num * 100) / 100; };
import React, { Component, PropTypes } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { grey700, indigo900, indigo100, blue500, indigo50 } from 'material-ui/styles/colors';
import ActionTrendingFlat from 'material-ui/svg-icons/action/trending-flat';
import { TextField } from 'material-ui';
import './DietTotalsCard.scss';


class DietTotalsCard extends Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() { }


    render() {

      const { totalCalories, totalCarbohydrates, totalFats, totalProteins } = this.props;
      
      return(

          <div>
            <Card>
              <CardHeader
                title="Totales"
                subtitle="Si deseas ver los totales, haz clic aquí"
                avatar={<ActionTrendingFlat style={styles.iconActionTrandingStyles}/>}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true} style={{ color: grey700, fontSize: 16 }}>

                <div className="grid-totals">

                  <TextField
                    floatingLabelStyle={styles.floatingLabelStyle}
                    name="totalProteins"
                    floatingLabelText="Proteins"
                    readOnly
                    value={totalProteins}
                  />

                  <TextField
                    floatingLabelStyle={styles.floatingLabelStyle}
                    name="totalCarbohydrates"
                    floatingLabelText="Carbohydrates"
                    readOnly
                    value={totalCarbohydrates}
                  />

                  <TextField
                    floatingLabelStyle={styles.floatingLabelStyle}
                    name="totalFats"
                    floatingLabelText="Fats"
                    readOnly
                    value={totalFats}
                  />

                  <TextField
                    floatingLabelStyle={styles.floatingLabelStyle}
                    name="totalCalories"
                    floatingLabelText="Calories"
                    readOnly
                    value={totalCalories}
                  />

                </div>

              </CardText>
            </Card>
          </div>
        );
    }
}

DietTotalsCard.propTypes = {
  totalCalories: PropTypes.number.isRequired,
  totalCarbohydrates: PropTypes.number.isRequired,
  totalFats: PropTypes.number.isRequired,
  totalProteins: PropTypes.number.isRequired,
};

const styles = {
    iconActionTrandingStyles: { 
      marginTop: 10, 
      color: indigo900, 
      background: indigo50, 
      border: `2px solid ${indigo50}`, 
      borderRadius: '25px' 
    },
    floatingLabelStyle: {
      fontSize: 22,
      color: blue500
    }
}
  
export default DietTotalsCard;
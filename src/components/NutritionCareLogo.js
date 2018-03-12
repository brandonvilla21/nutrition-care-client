import React from 'react';

const NutritionCareLogo = () => {
    const styles = {
        container: {
            // display: 'flex',
            // justifyContent: 'flex-start',
            // alignItems: 'flex-end',
            // marginTop: 0,

            position: 'absolute',
            top: '200px',
            left: '-30px',
            zIndex: '1000',
            overflow: 'hidden',
            height: '200px',
            // margin: 'auto'
            // backgroundImage:  'url(' + require('../images/nutrition_care.png') + ')',
            // zIndex: '100',
            // height: '200px',
            // width: '200px'
        },
        img: {
            height: '280px',
            backgroundColor: 'white',
            // boxShadow: '5px 10px #888888'
        }
    };
    return(
        <div style={styles.container}>
            <img style={styles.img} src="../images/nutrition_care.png" />
        </div>
    );
};

export default NutritionCareLogo;
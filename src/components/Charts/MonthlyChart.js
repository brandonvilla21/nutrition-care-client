// import React, { PropTypes } from 'react';
// import { LineChart, Line, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
// import { blue400, green400 } from 'material-ui/styles/colors';
// /**
//  * Not finished
//  * Not finished
//  * 
//  * @param {props} props from Parent Component
//  */
// const MonthlyChart = (props) => {
    
//     const generateDays = () => {
//         return new Promise((resolve, reject) => {
//             const days = [];
//             for( let i = 1; i <= 31; i++)
//                 ( value => { days.push({name: value}); })(i);
//             resolve(days);
//         })
//     };

//     const prepareData = () => {
//         return new Promise((resolve, reject) => {
//             resolve(props.data.map( e => {
//                 const { name } = e;
//                 const len = name.length;
                
//                 const el = {
//                     peso: e.peso,
//                     dia: parseInt(e.name.substring( len-2, len))
//                 }
//                 return el;
//             }));


//         })
//     };

//     const addDataToDays = (days, prepareData) => {
//         return new Promise((resolve, reject) => {
//             days.forEach((day, index) => {
//                 days[index].data = prepareData.filter( data => {
//                     if (data.dia === day.name)
//                         return data;
                    
//                 })
//             });
//             resolve(days);
//         });
//     };
//     let daysD;
//     generateDays()
//         .then( days => {console.log(days);daysD = days; return prepareData()})
//         .then( prepared => {console.log(prepared); return addDataToDays(daysD, prepared) })
//         .then( bah => console.log(bah));
    
//     return (
//         <div>
//             <LineChart width={600} height={300} data={dataEx2} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
//                 <Line type="monotone"
//                     dataKey="enero"
//                     stroke={blue400} />
//                 <Line type="monotone"
//                     dataKey="febrero"
//                     stroke={green400} />
                      
//                 <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
//                 <XAxis
//                     dataKey="day"
//                     domain={[0, 31]}
//                     />
//                 <YAxis
//                     domain={[40, 90]}
//                     label="Not showing :c"
//                 />
//                 <Tooltip />
//             </LineChart>
//         </div>
//     );
// };
// // Generar un arreglo de 1 a 31 ( con los dias)
// const dataKeyEx = 'weight';
// const dataEx1 = [
//     { enero: 70, febrero: 74, day: 4 },
//     { enero: 74, febrero: 77, day: 14 },
//     { enero: 75, febrero: 79, day: 24 },
// ];

// MonthlyChart.propTypes = {
//     data: PropTypes.array,
//     dataKey: PropTypes.string,
//     minX: PropTypes.number,
//     maxX: PropTypes.number,

// };

// export default MonthlyChart;
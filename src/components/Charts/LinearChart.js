import React, { PropTypes } from 'react';
import { LineChart, Line, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
import { blue400 } from 'material-ui/styles/colors';

const LinearChart = (props) => {
    const dataKeyArray = props.data.map( e => e[props.dataKey] );
    const   min = Math.min( ...dataKeyArray ),
            max = Math.max( ...dataKeyArray );
    
    return (
        <div>
            <LineChart width={600} height={300} data={props.data} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                <Line type="monotone" dataKey={props.dataKey} stroke={blue400} />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                    domain={[min, max]}
                    label="Not showing :c"
                />
                <Tooltip />
            </LineChart>
        </div>
    );
};

LinearChart.propTypes = {
    data: PropTypes.array,
    dataKey: PropTypes.string,

};

export default LinearChart;
import React, { Component, PropTypes } from 'react';
import { BarChart, Bar, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
import { blue400 } from 'material-ui/styles/colors';
import ReactResizeDetector from 'react-resize-detector';

/**
 * This chart component can be use it in case of needing
 * data like this: [{name: 'something', dataKey: somevalue}, ...]
 */
class BarChartP extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    componentDidMount() {
      this.updateWindowDimensions();
    }

    updateWindowDimensions() {
        this.setState({ width: this.chartContainer.offsetWidth, height: this.chartContainer.offsetHeight });
    }

    onResize () {
        this.updateWindowDimensions();
    }

    render() {
        const dataKeyArray = this.props.data.map( e => e[this.props.dataKey] );
        const   min = Math.min( ...dataKeyArray ),
                max = Math.max( ...dataKeyArray );
        
        return (
            <div ref={e => {this.chartContainer = e;}}>
                <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />

                <BarChart width={this.state.width} height={300} data={this.props.data} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                    <Bar type="monotone" dataKey={this.props.dataKey} fill={blue400} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        domain={[min - 5, max + 5]}
                    />
                    <Tooltip />
                </BarChart>
            </div>
        );
    }
}

BarChartP.propTypes = {
    data: PropTypes.array,
    dataKey: PropTypes.string,

};

export default BarChartP;
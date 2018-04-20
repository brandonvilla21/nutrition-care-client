import React, { Component, PropTypes } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { blue400 } from 'material-ui/styles/colors';
import ReactResizeDetector from 'react-resize-detector';

/**
 * This chart component can be use it in case of needing
 * data like this: [{name: 'something', dataKey: somevalue}, ...]
 */
class PieChartP extends Component {

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
        return (
            <div ref={e => {this.chartContainer = e;}}>
                <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />

                <PieChart width={this.state.width} height={300} data={this.props.data} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                    <Pie data={this.props.data} valueKey={this.props.dataKey} cx={(this.state.width / 2)} cy={(this.state.height/2)} outerRadius={(this.state.width / 4) - 20} fill={blue400} label/>
                    <Tooltip />
                </PieChart>
            </div>
        );
    }
}

PieChartP.propTypes = {
    data: PropTypes.array,
    dataKey: PropTypes.string,

};

export default PieChartP;
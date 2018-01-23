'use strict';

import React, {Component} from 'react'
import {
    ART,
    Dimensions
} from 'react-native';

const {Surface, Group, Shape} = ART

import * as shape from 'd3-shape';
import {path} from 'd3-path';

const d3 = {
    shape
};

export default class PieChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            paths: []
        };
    }
    componentDidMount = () => {
        if (this.props.data) this._loadPie(this.props.data);
    }

    _loadPie = (data) => {
        var arcs = d3.shape
            .pie()
            .value(item => item.value)(data);

        var paths = arcs.map(arc => {
            return d3.shape
                .arc()
                .outerRadius(this.props.width / 2 - this.props.padding)
                .padAngle(.04)
                .innerRadius(this.props.width / 6)(arc);
        });

        this.setState({
            paths: paths
        });
    }

    render() {
        return (
            <Surface width={this.props.width} height={this.props.height}>
                <Group x={this.props.width / 2} y={this.props.height / 2}>
                    {this.state.paths.map((path, index) => (
                        <Shape
                            key={'pie_slice_' + index}
                            d={path}
                            stroke={this.props.data[index].color}
                            strokeWidth={1}
                            fill={this.props.data[index].color}/>
                    ))}
                </Group>
            </Surface>
        )
    }
};

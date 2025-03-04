import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.status}
                </td>
                <td>
                    {this.props.obj.frame}
                </td>
                <td>
                    {this.props.obj.package}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
            </tr >
        );
    }
}

export default DataTable;
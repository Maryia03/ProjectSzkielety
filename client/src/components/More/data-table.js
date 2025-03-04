import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.fName} {this.props.obj.lName}
                </td>
                <td>
                    {this.props.obj.email}
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
                <td>
                    {this.props.obj.status}
                </td>
            </tr >
        );
    }
}

export default DataTable;
import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.frame}
                </td>
                <td>
                    {this.props.obj.package}
                </td>
                <td>
                    {this.props.obj.status}
                </td>
                <td>
                    <a href={"/moreinfo?id=" + this.props.obj._id}>Pokaż więcej</a>
                </td>
            </tr >
        );
    }
}

export default DataTable;
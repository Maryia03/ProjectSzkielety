import React, { Component, useState } from 'react';
import axios from 'axios';
import DataTable from './data-table';
import styles from "./styles.module.css"
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("email")
    localStorage.removeItem("lName")
    localStorage.removeItem("fName")
    window.location.reload()
}

const handleMain = () => {
    window.location = "/"
}

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };
    }

    getAllData() {
        const url = "http://localhost:8080/api/list/get"
        axios.get(url)
            .then(res => {
                this.setState({ usersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getData(status) {
        const url = "http://localhost:8080/api/list/get/" + status
        axios.get(url)
            .then(res => {
                this.setState({ usersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getAllData("_id")
    }

    dataTable() {
        return this.state.usersCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    handleChange = e => {
        const filter = e.target.value;
        if (filter === "wsyzstkie") {
            this.getAllData("_id")
        } else if (filter === "przyjete") {
            this.getData("Samochód przyjęty do naprawy")
        } else if (filter === "realizacja") {
            this.getData("Samochód w trakcie naprawy")
        } else if (filter === "zakonczone") {
            this.getData("Samochód naprawiony, gotowy do odbioru")
        } else if (filter === "odebrane") {
            this.getData("Samochód odebrany")
        }
    }

    render() {
        return (
            <div className="wrapper-users">
                <nav className={styles.navbar}>
                    <a href="#" onClick={handleMain}><h1>Panel Administratora</h1></a>
                    <div className={StyleSheet.navbar_buttons}>
                        <button className={styles.white_btn} onClick={handleLogout}>
                            Wyloguj się
                        </button>
                    </div>
                </nav>

                <div className='container'>
                    <div className={styles.filterButtons}>
                        Filtrowanie:
                        <form>
                            <select name="select" className={styles.select} onChange={this.handleChange} required>
                                <option value="wsyzstkie">Wszystkie</option>
                                <option value="przyjete">Przyjęte</option>
                                <option value="realizacja">W realizacji</option>
                                <option value="zakonczone">Zakończone</option>
                                <option value="odebrane">Odebrane</option>
                            </select>
                        </form>
                    </div>

                    <Table striped bordered hover size="sm">
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Marka samochodu</th>
                                <th>Rodzaj serwisu</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

import React, { Component, useState } from 'react';
import axios from 'axios';
import DataTable from './data-table';
import styles from "./styles.module.css"
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id')

const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("email")
    localStorage.removeItem("fName")
    localStorage.removeItem("lName")
    window.location.reload()
}


const handlePrzyjete = () => {
    const url = "http://localhost:8080/api/list/update/przyjete/" + id
    axios.get(url)
        .then(res => {
            this.setState({ usersCollection: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    window.location.reload()
}

const handleRealizacja = () => {
    const url = "http://localhost:8080/api/list/update/realizacja/" + id
    axios.get(url)
        .then(res => {
            this.setState({ usersCollection: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    window.location.reload()
}

const handleZakonczone = () => {
    const url = "http://localhost:8080/api/list/update/zakonczone/" + id
    axios.get(url)
        .then(res => {
            this.setState({ usersCollection: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    window.location.reload()
}

const handleOdebrane = () => {
    const url = "http://localhost:8080/api/list/update/odebrane/" + id
    axios.get(url)
        .then(res => {
            this.setState({ usersCollection: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    window.location.reload()
}

const handleDelete = () => {
    const url = "http://localhost:8080/api/list/delete/" + id
    axios.get(url)
        .then(res => {
            this.setState({ usersCollection: res.data });
        })
        .catch(function (error) {
            console.log(error);
        })
    window.location = "/"
}

const handleMain = () => {
    window.location = "/"
}

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };
    }

    getData() {
        const url = "http://localhost:8080/api/list/moreinfo/" + id
        axios.get(url)
            .then(res => {
                this.setState({ usersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getData()
    }

    dataTable() {
        return this.state.usersCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <nav className={styles.navbar}>
                    <a href="#" onClick={handleMain}><h1>Szczegóły</h1></a>
                    <div className={StyleSheet.navbar_buttons}>
                        <button className={styles.white_btn} onClick={handleLogout}>
                            Wyloguj się
                        </button>
                    </div>
                </nav>

                <div className='container'>
                    <Table striped bordered hover size="sm">
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Imię i nazwisko</th>
                                <th>Email</th>
                                <th>Marka samochodu</th>
                                <th>Rodzaj serwisu</th>
                                <th>Opis</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.dataTable()}
                        </tbody>
                    </Table>
                    <h2>Ustaw status</h2>
                    <div className={styles.buttons}>
                        <button className={styles.blue_btn} onClick={handlePrzyjete}>
                            Przyjęte
                        </button>
                        <button className={styles.blue_btn} onClick={handleRealizacja}>
                            W realizacji
                        </button>
                        <button className={styles.blue_btn} onClick={handleZakonczone}>
                            Zakończone
                        </button>
                        <button className={styles.blue_btn} onClick={handleOdebrane}>
                            Odebrane
                        </button>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.red_btn} onClick={handleDelete}>
                            Usuń
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

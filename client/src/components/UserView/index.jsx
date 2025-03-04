import React, { Component } from 'react';
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
    window.location.href = '/login';
}

const handleMain = () => {
    window.location = "/"
}

const handleZamow = () => {
    window.location = "/create"
}

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };
    }

    async getAllData() {
        const token = localStorage.getItem("token");
        if (token) {
            const url = "http://localhost:8080/api/list/getuser/" + localStorage.getItem("email")
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token,
                },
            };
            try {
                const res = await axios.get(url, config);
                this.setState({ usersCollection: res.data });
            } catch (error) {
                if (
                  error.response &&
                  error.response.status >= 400 &&
                  error.response.status <= 500
                ) {
                  localStorage.removeItem("token");
                  window.location.reload();
                }
              }
            }
          }

    async getData(status) {
        const token = localStorage.getItem("token");
        if (token) {
            const url = `http://localhost:8080/api/list/getuser/${status}/${localStorage.getItem("email")}`;
            const config = {
                headers: {
                            "Content-Type": "application/json",
                            "x-access-token": token,
                        },
                    };
            try {
                const res = await axios.get(url, config);
                this.setState({ usersCollection: res.data });
            } catch (error) {
                if (
                  error.response &&
                  error.response.status >= 400 &&
                  error.response.status <= 500
                ) {
                  localStorage.removeItem("token");
                  window.location.reload();
                }
              }
            }
          }

    componentDidMount() {
        this.getAllData()
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

    handleDeleteAccount = async () => {
        const confirmed = window.confirm('Czy na pewno chcesz usunąć swoje konto?');
        if (confirmed) {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const config = {
                        method: "delete",
                        url: "http://localhost:8080/api/users/deleteAccount",
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": token,
                        },
                    };
                    const { data: res } = await axios(config);
                    localStorage.removeItem("token");
                    window.location.href = '/login';
                } catch (error) {
                    console.error('Error deleting user account:', error);
                    alert('Wystąpił błąd podczas usuwania konta.');
                }
            }
        }
    };
    
    render() {
        return (
            <div className="wrapper-users">
                <nav className={styles.navbar}>
                    <a href="#" onClick={handleMain}><h1>Panel Klienta</h1></a>
                    <div className={StyleSheet.navbar_buttons}>
                        <button className={styles.white_btn} onClick={handleZamow}>
                            Zamów usługę
                        </button>
                        <button className={styles.white_btn} onClick={this.handleDeleteAccount}>
                            Usuń konto 
                        </button>
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
                                <th>Status</th>
                                <th>Marka samochodu</th>
                                <th>Rodzaj serwisu</th>
                                <th>Opis</th>
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

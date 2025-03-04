import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

const CreateLogged = () => {
    const [data, setData] = useState({
        fName: localStorage.getItem("fName"),
        lName: localStorage.getItem("lName"),
        email: localStorage.getItem("email"),
        frame: "",
        package: "Serwis startowy",
        description: "",
        status: "Samochód przyjęty do naprawy",
    })
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleReset = () => {
        window.location = "/create"
    }

    const handleMain = () => {
        window.location = "/"
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/create"
            const { data: res } = await axios.post(url, data)
            window.location = "/"
            console.log(res.message)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <div className={styles.con}>
            <nav className={styles.navbar}>
                <a href="#" onClick={handleMain}><h1>Składanie zamówienia</h1></a>
            </nav>
            <div className={styles.main_container}>
                <form id="form" className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Uzupełnij formularz</h1>
                    <div className={styles.text}>Marka samochodu</div>
                    <input
                        type="text"
                        placeholder="Podaj markę swojego samochodu..."
                        name="frame"
                        onChange={handleChange}
                        value={data.frame}
                        required
                        className={styles.input}
                    />
                    <div className={styles.text}>Wybierz pakiet serwisowy</div>
                    <select name="package" className={styles.select} onChange={handleChange} required>
                        <option value="start">Serwis startowy</option>
                        <option value="posredni">Serwis pośredni</option>
                        <option value="podstawowy">Serwis podstawowy</option>
                        <option value="kompleksowy">Serwis kompleksowy</option>
                        <option value="elementy">Serwis elementów</option>
                    </select>
                    <div className={styles.text}>Opis</div>
                    <textarea
                        rows="10"
                        placeholder="Opisz na czym polega problem z samochodem..."
                        name="description"
                        onChange={handleChange}
                        value={data.description}
                        required
                        className={styles.input}>
                    </textarea>

                    {error && <div
                        className={styles.error_msg}>{error}</div>}
                    <div>
                        <button type="submit"
                            className={styles.green_btn}>
                            Send
                        </button>
                        <button type="reset"
                            className={styles.red_btn
                            }
                            onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}
export default CreateLogged
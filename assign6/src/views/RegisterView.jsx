import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./RegisterView.css";

function RegisterView() {
    const navigate = useNavigate();
    const { userData, setUserData } = useStoreContext();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confPass: ''
    });
    const [genresArray] = useState([
        { genre: "Action", id: 28 },
        { genre: "Adventure", id: 12 },
        { genre: "Animation", id: 16 },
        { genre: "Crime", id: 80 },
        { genre: "Family", id: 10751 },
        { genre: "Fantasy", id: 14 },
        { genre: "History", id: 36 },
        { genre: "Horror", id: 27 },
        { genre: "Mystery", id: 9648 },
        { genre: "Sci-Fi", id: 878 },
        { genre: "War", id: 10752 },
        { genre: "Western", id: 37 }
    ]);

    function createAccount(event) {
        event.preventDefault();

        if (userInfo.password !== userInfo.confPass) {
            alert("Passwords do not match!");
            setUserInfo((prev) => ({ ...prev, password: '', confPass: '' }));
        } else if (userData.has(userInfo.email)) {
            alert("This email has already been registered!");
            setUserInfo((prev) => ({ ...prev, firstName: '', lastName: '', email: '', password: '', confPass: '' }));
        } else {
            const newData = new Map(userData);
            newData.set(userInfo.email, userInfo);
            setUserData(newData);
            alert("Account successfully created");
            navigate(`/`);
        }
    }

    return (
        <div className="register-view">
            <Header />
            <div className="register">
                <div className="register-menu">
                    <h1 className="register-label">Sign Up</h1>
                    <form className="register-form" id="register-form" onSubmit={(event) => { createAccount(event) }}>
                        <label htmlFor="reg-first-name" className="reg-input-label">First Name:</label>
                        <input type="text" name="reg-first-name" className="reg-input" id="reg-first-name" value={userInfo.firstName} onChange={(event) => { setUserInfo((prev) => ({ ...prev, firstName: event.target.value })) }} required />
                        <label htmlFor="reg-last-name" className="reg-input-label">Last Name:</label>
                        <input type="text" name="reg-last-name" className="reg-input" id="reg-last-name" value={userInfo.lastName} onChange={(event) => { setUserInfo((prev) => ({ ...prev, lastName: event.target.value })) }} required />
                        <label htmlFor="reg-email" className="reg-input-label">Email:</label>
                        <input type="email" name="reg-email" className="reg-input" id="reg-email" value={userInfo.email} onChange={(event) => { setUserInfo((prev) => ({ ...prev, email: event.target.value })) }} required />
                        <label htmlFor="reg-pass" className="reg-input-label">Password:</label>
                        <input type="password" name="reg-pass" className="reg-input" id="reg-pass" value={userInfo.password} onChange={(event) => { setUserInfo((prev) => ({ ...prev, password: event.target.value })) }} required />
                        <label htmlFor="reg-conf-pass" className="reg-input-label">Confirm Password:</label>
                        <input type="password" name="reg-conf-pass" className="reg-input" id="reg-conf-pass" value={userInfo.confPass} onChange={(event) => { setUserInfo((prev) => ({ ...prev, confPass: event.target.value })) }} required />
                        <input type="submit" value="Register" className="submit-button" id="reg-submit" />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterView;
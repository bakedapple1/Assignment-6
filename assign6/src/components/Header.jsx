import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const { userData, currentUser, setCurrentUser } = useStoreContext();

    function logOut() {
        setCurrentUser(null);
        alert("Logged out!");
    }

    return (
        <div className="nav-bar">
            <div className="logo" onClick={() => navigate(`/`)}>
                BingeBerry
            </div>

            {currentUser ? (
                <div className="logged-in">
                    <p className="welc-msg">Welcome, {userData.get(currentUser).firstName}!</p>
                    <button className="log-out" onClick={() => logOut()}>
                        Log out
                    </button>
                </div>
            ) : (
                <div className="logged-out">
                    <button className="sign-up" onClick={() => navigate(`/register`)}>
                        Sign up
                    </button>
                    <button className="log-in" onClick={() => navigate(`/login`)}>
                        Log in
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;
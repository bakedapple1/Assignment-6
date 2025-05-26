import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context";
import ImgNotAvail from "../assets/img not avail.png";

function SearchView() {
    const navigate = useNavigate()
    const { pageNum, setPageNum, cart, setCart, query } = useStoreContext();
    const [searchRes, setSearchRes] = useState([]);

    useEffect(() => {
        if (!query) {
            setSearchRes([]);
            return;
        }
        const timer = setTimeout(() => {
            async function getData() {
                const queryRes = (await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${query}&include_adult=false&language=en-US&page=1&page=${pageNum}`)).data.results;
                setSearchRes([...queryRes]);
                console.log([...queryRes]);
            };

            getData();
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);


    function changePageBy(changeBy) {
        if (pageNum + changeBy < 1) {
            setPageNum(1);
        } else if (pageNum + changeBy > 500) {
            setPageNum(500);
        } else {
            setPageNum(pageNum + changeBy);
        }
    }

    return (
        <div className="search-view-container">
            <div className="search-movies">
                {searchRes.map(movie => (
                    <div className="search-mov" key={movie.id}>
                        <img className="search-mov-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ImgNotAvail} key={`${movie.id}`} onClick={() => navigate(`/movies/details/${movie.id}`)} />
                        <h1 className="search-mov-label">{`${movie.title}`}</h1>
                        <button className="search-buy-button" disabled={cart.has(movie.id)} onClick={() => setCart((prevCart) => prevCart.set(movie.id, movie))}>{cart.has(movie.id) ? "Added" : "Buy"}</button>
                    </div>
                ))}
            </div>

            <div className="pagination" >
                <button className={(pageNum != 1) ? "active-ten-page-button" : "inactive-ten-page-button"} onClick={() => changePageBy(-10)}>&lt;&lt;</button>
                <button className={(pageNum != 1) ? "active-page-button" : "inactive-page-button"} onClick={() => changePageBy(-1)}>Prev</button>
                <div className="page-counter" >Page: {pageNum}</div>
                <button className={(pageNum != 500) ? "active-page-button" : "inactive-page-button"} onClick={() => changePageBy(1)}>Next</button>
                <button className={(pageNum != 500) ? "active-ten-page-button" : "inactive-ten-page-button"} onClick={() => changePageBy(10)}>&gt;&gt;</button>
            </div>
        </div>
    );
}

export default SearchView;
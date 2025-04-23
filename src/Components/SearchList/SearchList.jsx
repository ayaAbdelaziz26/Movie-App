import { useContext, useEffect, useState } from "react";
import full_heart from '../../assets/full_heart.png';
import empty_heart from '../../assets/empty-heart.png'
import './SearchList.css'
import { useSelector } from "react-redux";
const SearchList = () => {
    const data = useSelector(state => state.input.result)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // عدد العناصر في الصفحة الواحدة
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const [check, setcheck] = useState([{}]);
    function handelheart(itemid) {
        setcheck(
            {
                ...check,
                [itemid]: !check[itemid]
            }
        )

    }


    return (
        <div className="container">
            <div className="row mb-5">
                {
                    currentItems?.map((item) => {
                        const isliked = check[item.id] || false;
                        const rate = Math.round(item.vote_average * 10); // مثال: 7.3 → 73

                        const rateStyle = {
                            background: `conic-gradient(green 0% ${rate}%, #204529 ${rate}% 100%)`
                        };
                        return (
                            <div className="col-sm-6 mb-0 gy-4 col-md-4 col-lg-3 search-card pb-5" key={item.id}>
                                <div className="position-relative">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${item.backdrop_path}`}
                                        alt={item.original_title}
                                        style={{ width: '100%', height: '300px', borderRadius: '10px', zIndex: '1' }}
                                    />
                                    <div className="rate-background"></div>
                                    <div className="rate" style={rateStyle}>
                                        <div className="rate-number">{rate}%</div>
                                    </div>
                                </div>

                                <h3 className="mb-0 text-start mt-5">{item.original_title}</h3>
                                <div className="d-flex mt-0 justify-content-between align-items-center">
                                    <p className="mb-0">
                                        {
                                            new Date(item.release_date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: '2-digit',
                                                year: 'numeric',
                                            })
                                        }
                                    </p>

                                    <img
                                        src={isliked ? full_heart : empty_heart}
                                        style={{ height: '20px', cursor: 'pointer' }}
                                        onClick={() => handelheart(item.id)}
                                        alt="heart"
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap mb-5">
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? "button-background":"button-unclicked"}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>



        </div >
    )
}
export default SearchList;
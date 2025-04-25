import { useState, useEffect } from "react";
import full_heart from '../../assets/full_heart.png'; 
import empty_heart from '../../assets/empty-heart.png'; 
import './SearchList.css';
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../../redux/inputslice"; 

const SearchList = () => {
  const data = useSelector(state => state.input.result);
  const watchlist = useSelector(state => state.input.watchlist); // استخدام الـ Redux watchlist
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const dispatch = useDispatch();

  // تحديث القلب بناءً على الـ watchlist في الـ Redux
  const isLiked = (itemId) => {
    return watchlist.some(item => item.id === itemId); // التحقق إذا كان الفيلم في الـ watchlist
  };

  const handleHeartClick = (itemId, movie) => {
    if (isLiked(itemId)) {
      dispatch(removeFromWatchlist(movie.id)); // إزالة من الـ watchlist
    } else {
      dispatch(addToWatchlist(movie)); // إضافة إلى الـ watchlist
    }
  };

  return (
    <div className="container">
      <div className="row mb-5">
        {currentItems?.map((item) => {
          const rate = Math.round(item.vote_average * 10);

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
                  {new Date(item.release_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </p>

                {/* زر القلب للتبديل بين الصور */}
                <img
                  src={isLiked(item.id) ? full_heart : empty_heart}
                  style={{ height: '20px', cursor: 'pointer' }}
                  onClick={() => handleHeartClick(item.id, item)} 
                  alt="heart"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* عرض أزرار الصفحات */}
      <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap mb-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "button-background" : "button-unclicked"}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchList;

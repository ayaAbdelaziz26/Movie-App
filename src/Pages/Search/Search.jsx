
import SearchInput from "../../Components/SearchIput/SearchInput";
import SearchList from "../../Components/SearchList/SearchList";
import { useSelector } from "react-redux";

const SearchPage = (props) => {
    const input=useSelector(state=>state.input.value)
   
    
    return (
        <>
           
                <SearchInput />
                <h4 className="text-start" style={{ marginLeft: '4%',marginBottom:'2px' }}>Search Results for:{input}</h4>
                <SearchList />
           
        </>
    )
}
export default SearchPage;
import React,{useState} from "react";
import { searchItem } from "./Slices";
import { useDispatch } from "react-redux";
const SearchBar=()=>{
    const[query,setQuery]=useState()
    const dispatch=useDispatch()
    const handleSearch=(e)=>{
     const value = e.target.value.trim().toLowerCase()
     setQuery(value)
    dispatch(searchItem(query))
    }
   return(
    <div className="searchBarWrapper">
    <input onChange={handleSearch} type='search' placeholder="Search medicine..."/>
    </div>
   )
}
export default SearchBar
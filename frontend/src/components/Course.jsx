import React, { useEffect, useState } from "react";
import Cards from "./Cards";
//import list from "../../public/list.json";
import axios from "axios";
import {Link} from "react-router-dom";
function Course() {
  const [books,setBook] = useState([]);

  useEffect(()=>{
    const books =async()=>{
try{
 const res= await  axios.get("http://localhost:8080/books");
 console.log(res.data);
 setBook(res.data)
}catch(error){
console.log(error)
}
    }
books();
  },[])
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus ipsa numquam quibusdam harum cupiditate veniam autem
            nemo at distinctio, nostrum ut alias sit molestias reprehenderitf
            corporis natus sapiente est repudiandae similique aut mollitiaff!
            velit totam saepe dolor quae aperiam, dolore quasi neque nemo odio,
            cum cupiditate! Reiciendis, quasi ipsam odio ipsum autem?
            Atque, blanditiis! Inventore id dicta a iusto?
          </p>
          <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">Back</button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {
          books.map((item)=>(
            <Cards key={item.id} item={item}/>
          ))
        }
        </div>
      </div>
    </>
  );
}

export default Course;

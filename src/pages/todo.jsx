import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";

const Todos = () => {

  const [todo,setTodos] = useState([])
  const [name,setName] = useState("")
  const [fetching,isFetching]=useState(true)
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const setTodo = async() => {
    await axios.post('http://localhost:3000/todo',{title:name},{
        headers: {
            "Accept": "*/*, application/json, text/plain",
            Authorization: `Bearer ${token}`
            }
      })
      .then((res)=>{
        
      })
      .catch((err)=>{
       
      })
      isFetching(true)
  };

  const getTodos = async() => {
    await axios.get('http://localhost:3000/todo',{
        headers: {
            "Accept": "*/*, application/json, text/plain",
            Authorization: `Bearer ${token}`
            }
      })
      .then((res)=>{
        setTodos(res.data)
      })
      .catch((err)=>{
       
      })
  };

  const removeTodo = async(id) => {
    await axios.delete('http://localhost:3000/todo/'+id,{
        headers: {
            "Accept": "*/*, application/json, text/plain",
            Authorization: `Bearer ${token}`
            }
      })
      .then((res)=>{
        isFetching(true)
      })
      .catch((err)=>{
       
      })
      
  };


  useEffect(() => {
    if (!fetching) return;
    getTodos(); 
    isFetching(false)

  }, [fetching]);
  return (
    <>
      {fetching ? (
        <p>Loading</p>
      ) : (
        <div>
            <label>Todo Adı</label>
            <input type="text"  onChange={(e)=>{setName(e.target.value)}}/>
            <button onClick={setTodo}>Oluştur</button>
       {
        todo.map((item) => (
        
            <div style={{display:"flex",margin:"1em"}}>
             
                <TodoItem props={item} remove = {removeTodo} />
            </div>
           ))
       }
        </div>
      )}
    </>
  );
};

export default Todos;
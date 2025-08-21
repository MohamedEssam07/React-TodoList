import { ScrollText } from 'lucide-react';
import TodoItems from './TodoItems';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

interface IProps{

}
interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
}
const TodoList = ({}:IProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
const [todoList, setTodoList] = useState<Todo[]>(() => {
  const raw = localStorage.getItem("todos");
  return raw ? JSON.parse(raw) as Todo[] : [];
});
  
  const add = ()=>{
    if(inputRef.current){
      const inputText = inputRef.current.value.trim()
      if(inputText===""){
        return;
      }
      const newTodo:Todo = {
      id:uuidv4(),
      name:inputText,
      isCompleted:false,
  }
    setTodoList((prev)=> [...prev,newTodo])
    inputRef.current.value=""
    }
  }
  const deleteHandler=(id:string)=>{
       setTodoList((prev)=>prev.filter((item)=>item.id != id))
  }
  const toggle=(id:string)=>{
    setTodoList((prev)=>{
    return prev.map<Todo>((item)=>{
     return item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    })
    })
  }

  useEffect(()=>{localStorage.setItem("todos",JSON.stringify(todoList))},[todoList])
  return (
    <div className=" flex flex-col self-center mx-auto  w-[500px] max-h-[1000px] rounded-md shadow-xl 
  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className='flex flex-row mx-auto mt-36  '>
        <ScrollText className='w-11 h-11 text-zinc-50'/>
        <h1 className='text-zinc-50 text-3xl font-semibold'>Todo List</h1>
      </div>
      <div className='bg-slate-400 rounded-full w-4/6 h-10 flex items-center ml-[83px] mt-8'>
        <input ref={inputRef} type="text" className='outline-none bg-transparent px-5 placeholder-slate-700'placeholder='Add Your Tasks' />
        <button className='bg-indigo-300 w-44 h-10 rounded-full' onClick={add}>Add +</button>
      </div>
      <div className='flex flex-col gap-2 ml-[67px] mt-5'>
      {todoList.map((item)=><TodoItems text={item.name} deleteHandler={deleteHandler} id={item.id} toggle={toggle} isCompleted={item.isCompleted}/>)}
      </div>
    </div>
  )
}

export default TodoList
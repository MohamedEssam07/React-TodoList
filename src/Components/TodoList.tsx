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
    <div className="flex flex-col mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg rounded-md shadow-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 sm:p-6">
      <div className='flex items-center justify-center gap-2 mt-4'>
        <ScrollText className='w-8 h-8 sm:w-10 sm:h-10 text-zinc-50'/>
        <h1 className='text-zinc-50 text-2xl sm:text-3xl font-semibold'>Todo List</h1>
      </div>
      <div className='bg-slate-400 rounded-full w-full h-11 flex items-center mt-6 pl-2 pr-0 gap-1 overflow-hidden'>
        <input ref={inputRef} type="text" className='flex-1 min-w-0 h-full outline-none bg-transparent px-3 placeholder-slate-700 text-sm sm:text-base' placeholder='Add Your Tasks' />
        <button
          className='ml-0 inline-flex items-center justify-center h-full w-24 sm:w-28 md:w-32 shrink-0 rounded-full px-3 text-xs sm:text-sm font-semibold tracking-wide text-slate-900 bg-gradient-to-r from-indigo-300 to-indigo-400 ring-1 ring-white/50 shadow-sm hover:from-indigo-400 hover:to-indigo-500 active:from-indigo-500 active:to-indigo-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 disabled:opacity-60 disabled:cursor-not-allowed'
          onClick={add}
        >
          Add +
        </button>
      </div>
      <div className='flex flex-col gap-2 mt-5 w-full'>
        {todoList.map((item)=> (
          <TodoItems key={item.id} text={item.name} deleteHandler={deleteHandler} id={item.id} toggle={toggle} isCompleted={item.isCompleted}/>
        ))}
      </div>
    </div>
  )
}

export default TodoList
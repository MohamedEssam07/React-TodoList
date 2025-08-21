import { CircleCheck,Trash,Circle } from 'lucide-react';

interface IProps{
id:string;
text:string;
deleteHandler:(id:string)=>void;
toggle:(id:string)=>void;
isCompleted:boolean;
}

const TodoItems = ({text,deleteHandler,id,toggle,isCompleted}:IProps) => {
  return (
    <div className='flex flex-row  text-xl justify-between w-[330px] text-white cursor-pointer mb-3 '>
    <div className={`flex flex-row gap-2 ${isCompleted? `line-through`: ""}`} onClick={()=>toggle(id)}>
        {isCompleted?  <CircleCheck className='w-7 h-7'  />:  <Circle className='w-7 h-7' />}
        <p>{text}</p>
    </div>
    <Trash onClick={()=>deleteHandler(id)} />
    </div>
  )
}

export default TodoItems
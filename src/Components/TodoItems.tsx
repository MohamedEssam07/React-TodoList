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
    <div className='flex items-center justify-between w-full text-white cursor-pointer mb-3 text-base sm:text-lg'>
      <div className={`flex flex-row gap-2 ${isCompleted? `line-through`: ""}`} onClick={()=>toggle(id)}>
        {isCompleted?  <CircleCheck className='w-5 h-5 sm:w-6 sm:h-6'  />:  <Circle className='w-5 h-5 sm:w-6 sm:h-6' />}
        <p>{text}</p>
      </div>
      <Trash onClick={()=>deleteHandler(id)} />
    </div>
  )
}

export default TodoItems
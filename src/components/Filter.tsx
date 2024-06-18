
interface FilterProps {
  title: string;
  filters: Array<any>;
 }
const Filter = ({title, filters}: FilterProps) => {
  return (
    <div className="flex items-baseline border-b border-gray-200 pb-4 pt-4 justify-evenly">
      <p>{title}</p>
       {
          filters &&
          filters.map((item: any)=>
            <button onClick={item.url}>
              <p className="text-md tracking-tight text-gray-900">{item.title}</p>
            </button>
          )
        }
        
    </div>

  )
}

export default Filter

export default function Filter({filter, inputFilter}){
    return(
        <div>
          filter shown with <input value={filter} onChange={inputFilter} type="text" />
        </div>
    )
}
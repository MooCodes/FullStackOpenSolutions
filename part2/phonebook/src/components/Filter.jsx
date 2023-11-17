const Filter = (props) => 
    <>
        filter shown with <input value={props.searchTerm} onChange={props.onChange} />
    </>

export default Filter
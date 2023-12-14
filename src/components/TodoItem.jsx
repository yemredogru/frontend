const TodoItem = ({ props,remove }) => {

  return (
    <>
      <p>{props.id}</p>
      <p style={{ color: props.isCompleted ? 'green' : 'red' ,marginLeft:"1em"}}>
        {props.title}
      </p>
      <button onClick={()=>{remove(props.id)}}>Sil</button>
    </>
  );
};

export default TodoItem;

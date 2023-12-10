import {useState, useReducer} from 'react';

const initialState = {
  Todo:[]
}
const reducer = (state, action) => {
  if(action.type === 'ADD_ITEM') {
    return{
      ...state,
      Todo:[...state.Todo,{text: action.payload, id: Math.random()}]
    }
  }
  if(action.type === 'DELETE_ITEM') {
    let newTodos = state.Todo.filter((eachTodo) => {
     // console.log(eachTodo)
      return eachTodo.id !== action.payload
    })
    return{
      ...state,
      Todo: newTodos
    }
  }
  if(action.type === 'EDIT_ITEM') {
    return{
      ...state,
      Todo: state.Todo.map((newTodo) => newTodo.id === action.payload.id ? {...newTodo, text: action.payload.text}: newTodo)
    }
  }
  return state
}
export default function TodoList() {
  const[state, dispatch] = useReducer(reducer, initialState)
  const[editItem, setEditItem] = useState('')
  //handle AddTodos
  const addItem = (text) => {
    dispatch({
      type:'ADD_ITEM',
      payload:text
    })
  }
  //handle Delete
  const handleDelete = (id) => {
    dispatch({
      type: 'DELETE_ITEM',
      payload: id
    })
  }
  //handle Edit
  const handleEdit = (id,newText) => {
    dispatch({
      type:'EDIT_ITEM',
      payload:{id, text: newText}
    })
  }
  return(
    <>
      <div className='container'>
        <div className='todoMain'>
          <h1>Todo List</h1>
        </div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          const InputItem = e.target.todoText.value;
          if(InputItem.trim() !== '') {
            addItem(InputItem);
            e.target.todoText.value =''
        }
        }}
        >
          <div className='inpt inputFeild'>
          <input type='text' name='todoText'/>
          </div>
          <div className='addBtn'>
            <button className='btn add' type='submit'>add</button>
          </div>
          
        </form>
        <hr/>
        {
          state.Todo.length===0 && <h3 className='length'>There is no <i>Todo's</i></h3>
        }
        <ul>
        {
          state.Todo.map((eachItem) => {
            return(
            <li key={eachItem.id}>
              {
                eachItem.id === editItem ?(
                <div className='inpt'>
                  <input
                    type='text' 
                    defaultValue={eachItem.text}
                    onBlur={(e) => {handleEdit(eachItem.id,e.target.value); setEditItem('')}}
                  />
                </div>
                ):(
                <div className='main'>
                  <div>
                  <span className='item'>{eachItem.text}</span>
                  </div>
                  <div className='allBtn'>
                  <button className='btn Edit' onClick={() => setEditItem(eachItem.id)}>edit</button>
                  <button className='btn dlt' onClick={() => handleDelete(eachItem.id)}>delete</button>
                  </div>
                </div>
                )}
            </li>
            )
          })
        }
        </ul>
      </div>
    </>
    )
}
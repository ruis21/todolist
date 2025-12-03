import { useEffect, useReducer } from 'react'
import { TodoContext } from './assets/contexts/TodoContext';
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput';
import './App.css'

const todosReducer = (state, action) => {
  console.log(' 작동')

  switch (action.type) {
    // 추가 
    case 'ADD':
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.payload,
          done: false,
          isEditing: false
        }
      ]

    // 삭제 
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload)

    // 완료 
    case 'TOGGLE':
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, done: !item.done }
        }
        return item;
      });

    // 수정모드 
    case 'TOGGLE_EDIT':
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isEditing: !item.isEditing }
        }
        return item;
      });

    // 수정완료
    case 'UPDATE_TODO':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.text,
            isEditing: false
          }
        }
        return item;
      })
  }
}

function App() {
  let initialTodos = [];
  const saved = localStorage.getItem("todos");
  if (saved) {
    initialTodos = JSON.parse(saved);
  }
  // 없으면 그냥 빈 배열 [] 출력

  const [todos, dispatch] = useReducer(todosReducer, initialTodos)

  // todos 상태가 바뀔 때마다 localStorage에 저장 
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  // 할일 목록 추가 함수 
  function addTodo(newTodo) {
    dispatch({
      type: 'ADD',
      payload: newTodo,
    })
  }

  // 수정모드 전환 함수 (수정 버튼 클릭 시)
  function toggleEdit(id) {
    dispatch({
      type: 'TOGGLE_EDIT',
      payload: id,
    })
  }

  // 수정 완료 함수 (저장 버튼 클릭 시)
  function updateTodo(id, newText) {

    dispatch({
      type: 'UPDATE_TODO',
      payload: {
        id: id,
        text: newText
      }
    })
  }

  // 할일 완료 상태 이벤트 (체크박스)
  function toggleTodo(id) {
    dispatch({
      type: 'TOGGLE',
      payload: id
    })
  }

  // 할일 삭제 함수 
  function deleteTodo(id) {
    dispatch({
      type: 'DELETE',
      payload: id
    })
  }

  return (
    <div className='app'>
      <h1 className='title'>Todo List(할일)</h1>
      <div className='contents'>

        {/* 인풋 추가 영역  */}
        <TodoInput onAdd={addTodo} />

        <TodoContext.Provider value={{ deleteTodo, toggleTodo, toggleEdit, updateTodo }}>
          {/* 목록 영역  */}
          <TodoList
            todos={todos}
          />
        </TodoContext.Provider>
      </div>

    </div>
  )
}
export default App
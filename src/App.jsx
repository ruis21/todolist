import { useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput';
import './App.css'


function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {

    // localstorage에 'todos'라는 이름으로 저장된게 있는지 확인
    const saved = localStorage.getItem("todos");

    // 있으면 가져오고
    if (saved) {

      // JSON 문자열을 다시 객체 또는 배열로 변환해서 반환
      // JSON: 문자열로만 저장가능함
      return JSON.parse(saved)
    }

    // 없으면 빈 배열로 반환
    return []
  });

  // todos 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    // 원래 배열/객체를 문자열로 바꿔서 저장. todos에서만 실행이 되도록함.
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])





  function addTodo(newTodo) {
    setTodos([...todos,
    {
      // UUID : 겹치지않는 고유한 ID를 만들때 사용
      id: crypto.randomUUID(), // 숫자와 문자가 여러개 섞인 형식으로 나오게 됨 ex)id="827f3a55-edff-43c2-a5d0-8b570e2b0f9c"
      text: newTodo,
      done: false,
      isEditing: false
    }
    ]);
    // 새 항목 추가 시 완료상태는 false(미완료)
  }

  // 수정모드 전환 함수(수정 버튼 클릭시) : 체크박스와 동일
  function toggleEdit(id) {
    const editTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: !item.isEditing }
      }
      return item;
    });
    setTodos(editTodos)
  }
  // 수정완료 함수 (저장 버튼 클릭 시)
  function updateTodo(id, newText) {
    const updateTodos = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: newText,
          isEditing: false
          //텍스트를 변경 + isEditing false로 변경
        }
      }
      return item;
    })
    setTodos(updateTodos)
  }



  // 할일 완료 상태 이벤트(체크박스)
  function toggleTodo(id) {
    const newTodos = todos.map((item) => {
      if (item.id === id) { // 해당 id가 내가 클릭한 id면
        return { ...item, done: !item.done } //원래내용은 그대로 두고 done속성만 반대로 바꿔줌. !는 반대임.
      }
      return item;
    });

    setTodos(newTodos) // 새 배열로 상태 업데이트
  }



  // 할일 삭제 함수
  // function deleteTodo(deleteIndex) {
  //   const newTodos = [...todos] //기존 배열을 그대로 복사. 기존값은 그대로 둬야 나중에 활용가능. 
  //   newTodos.splice(deleteIndex, 1) //클릭한 deleteIndex 1개 삭제. 삭제만 하고 배열은 안된상태.
  //   setTodos(newTodos) //새 배열로 상태를 업데이트함.
  // }

  // filter 함수로 변경
  // filter: 배열을 하나씩 훑으면서 조건에 맞는것만 새 배열로 반환
  function deleteTodo(id) {
    //const newTodos = todos.filter((item,index) => index !== deleteIndex); //갖고온 애중에 index가 아닌애들을 deleteIndex로 데려오겠다?
    //setTodos(todos)

    //한줄로 적으면
    // setTodos(todos.filter((item, index) => index !== deleteIndex))

    // item 간단히 적는 방식(사용하지 않는 값을 적는 방식) : item이라는 값이 있긴 하지만 우리는 안쓸거에요. 즉 값(item)은 필요없고 위치(index)만 필요할때

    setTodos(todos.filter((item) => item.id !== id))
  }

  return (

    <div className='app'>
      <h1 className='title'>Todo List</h1>
      <div className='contents'>

        {/* 인풋 추가 영역  */}
        <TodoInput onAdd={addTodo} />

        {/* 목록 영역  */}
        <TodoList todos={todos} Delete={deleteTodo} onToggle={toggleTodo} onEdit={toggleEdit} onUpdate={updateTodo} />

      </div>

    </div>
  )
}

export default App


// 현재 todos는['자바스크립트 공부', '디자인 작업']

// text: 할일 내용
// done: 완료 여부


// 로컬스토리지란
// 웹 브라우저에 데이터를 저장하는 공간
// 브라우저를 닫아도 데이터를 유지
// 용량 제한있음


// import './App.css'
import { useState } from "react";
import TodoItem from "./TodoItem";


function TodoList({ todos }) {

    // 필터영역 추가 (전체/미완료/완료)
    const [filter, setFilter] = useState("전체");




    function filterTodos() {
        if (filter === "전체") {
            return todos;
        } else if (filter === "미완료") {
            return todos.filter(todo => !todo.done); //미완료일 때 
        } else if (filter === "완료") {
            return todos.filter(todo => todo.done); //완료일 때
        }
    }

    const todosShow = filterTodos(); //필터링된 할일 목록



    return (

        <div>
            <h2 className='list-title'>할일 목록</h2>
            <div className="filter-wrap">
                <button
                    className={`filter-btn ${filter === "전체" ? "active" : ""}`}
                    onClick={() => setFilter("전체")}>전체</button>
                <button
                    className={`filter-btn ${filter === "미완료" ? "active" : ""}`}
                    onClick={() => setFilter("미완료")}>미완료</button>
                <button
                    className={`filter-btn ${filter === "완료" ? "active" : ""}`}
                    onClick={() => setFilter("완료")}>완료</button>
            </div>


            {/* 리스트가 없을 때 '아직 할일이 없어요' 출력  */}
            {
                todosShow.length > 0 ?
                    <ul className='todo-list'>
                        {todosShow.map((item) => {
                            return (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                // Delete={Delete}
                                // onToggle={onToggle}
                                // onEdit={onEdit}
                                // onUpdate={onUpdate}
                                />
                            )
                        })}
                    </ul>
                    :
                    <p className='empty-list'>아직 할일이 없어요</p>
            }
        </div>

    )
}

export default TodoList
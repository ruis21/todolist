// import './App.css'
import { useState } from 'react';

function TodoList({ todos, Delete, onToggle, onEdit, onUpdate }) {

    // 필터영역 추가 (전체/미완료/완료)
    const [filter, setFilter] = useState("전체");
    const [editText, setEditText] = useState("");

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

        <div >
            <h2 className='list-title'>할일 목록</h2>
            <div className="filter-wrap">

                <button className={`filter-btn ${filter === "전체" ? "active" : ""}`} onClick={() => setFilter("전체")}>전체</button>
                <button className={`filter-btn ${filter === "미완료" ? "active" : ""}`} onClick={() => setFilter("미완료")}>미완료</button >
                <button className={`filter-btn ${filter === "완료" ? "active" : ""}`} onClick={() => setFilter("완료")}>완료</button>
            </div>

            {/* 리스트가 없을 때 '아직 할일이 없어요' 출력  */}
            {
                todosShow.length > 0 ?
                    <ul className='todo-list'>
                        {todosShow.map((item) => {

                            //이 item이 수정중 화면인지 출력화면인지 edit이라는 이름에 저장해둠
                            const edit = item.isEditing;



                            {/* 수정중 목록 화면  */ }
                            const editView = (
                                <li key={item.id} id={item.id}>
                                    <input type="text"
                                        className="edit-input"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button className="save-btn" onClick={() => { onUpdate(item.id, editText) }}>저장</button>
                                    <button className="cancel-btn">취소</button>
                                </li>
                            )


                            {/* 출력 목록 화면  */ }
                            const normalView = (
                                <li key={item.id} id={item.id}>
                                    <input
                                        type="checkbox"
                                        checked={item.done}
                                        onChange={() => onToggle(item.id)} />
                                    {/* 조건문, 삼항연산자형식  */}

                                    {/* 완료 안되었을 때  */}
                                    {/* {item.text}  */}

                                    {/* 완료되었을 때  */}
                                    {/* <del>{item.text} </del>  */}

                                    {item.done ? (<del>{item.text} </del>) : item.text}

                                    {/* 수정 버튼 추가  */}
                                    <button className="edit-btn"
                                        onClick={
                                            () => {
                                                onEdit(item.id); //수정중 화면으로 전환 (isEditing -> true)
                                                setEditText(item.text); //수정할 때 기존 텍스트를 입력창에 넣기
                                            }
                                        }
                                    >수정</button>
                                    <button className="delete-btn" onClick={() => Delete(item.id)}>X</button>
                                </li>
                            );

                            return (edit ? editView : normalView);
                        })}
                    </ul>
                    :
                    <p className='empty-list'>아직 할일이 없어요</p>
            }
        </div>

    )
}

export default TodoList
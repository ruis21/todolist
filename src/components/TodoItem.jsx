import { useState, useContext } from "react";
import { TodoContext } from "../assets/contexts/TodoContext";

function TodoItem({ item }) {

    // context에서 함수 가져오기 
    const { deleteTodo, toggleTodo, toggleEdit, updateTodo } = useContext(TodoContext);

    const [editText, setEditText] = useState("");
    const edit = item.isEditing;

    const editView = (
        <li key={item.id} id={item.id}>
            <input type="text"
                className="edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
            />
            <button
                className="save-btn"
                onClick={() => { updateTodo(item.id, editText) }}
            >저장</button>
            <button
                className="cancel-btn"
                onClick={() => { toggleEdit(item.id) }}
            >취소</button>
        </li>
    )

    const normalView = (
        <li key={item.id} id={item.id}>
            <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleTodo(item.id)} />


            {item.done ? (<del>{item.text} </del>) : item.text}


            <button className="edit-btn"
                onClick={
                    () => {
                        toggleEdit(item.id); //수정중 화면으로 전환 (isEditing -> true)
                        setEditText(item.text); //수정할 때 기존 텍스트를 입력창에 넣기
                    }
                }
            >수정</button>
            <button className="delete-btn" onClick={() => deleteTodo(item.id)}>X</button>
        </li>
    );

    return (edit ? editView : normalView);
    //수정 중이면 editView 보여주고, 아니면 normalView 보여줌
}

export default TodoItem
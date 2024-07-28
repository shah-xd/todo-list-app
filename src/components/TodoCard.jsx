import React from "react";

const TodoCard = (props) => {
  const { children, handleDelete, index, handleEdit } = props;
  return (
    <div>
      <li className="todoItem">
        {children}
        <div className="actionsContainer">
          <button
            onClick={() => {
              handleEdit(index);
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            onClick={() => {
              handleDelete(index);
            }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </li>
    </div>
  );
};

export default TodoCard;

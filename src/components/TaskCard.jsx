import React from "react";
import useTaskStore from "../store/useTaskStore";
import { Trash2, ChevronRight, ChevronLeft, Edit3 } from "lucide-react";

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask, toggleTaskStatus } = useTaskStore();

  const moveStatus = (direction) => {
    const statuses = ["Todo", "In Progress", "Completed"];
    const currentIndex = statuses.indexOf(task.status);
    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < statuses.length) {
      toggleTaskStatus(task.id, statuses[nextIndex]);
    }
  };

  return (
    <div className="task-card p-4 rounded-lg shadow-sm">
      <h4 className="font-semibold text-gray-800 capitalize">{task.title}</h4>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        {/* <button
          onClick={() => deleteTask(task.id)}
          className="text-red-400 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button> */}
        <div className="flex gap-1">
          {/* EDIT BUTTON */}
          {task.status !== "Completed" && (
            <button
              onClick={onEdit}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Edit Task"
            >
              <Edit3 size={16} />
            </button>
          )}

          {/* DELETE BUTTON */}
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex gap-2">
          {task.status !== "Todo" && (
            <button
              onClick={() => moveStatus("prev")}
              className="p-1 border rounded hover:bg-gray-50"
            >
              <ChevronLeft size={16} />
            </button>
          )}
          {task.status !== "Completed" && (
            <button
              onClick={() => moveStatus("next")}
              className="p-1 border rounded hover:bg-gray-50"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

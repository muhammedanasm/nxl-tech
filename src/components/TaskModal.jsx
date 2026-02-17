import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import useTaskStore from "../store/useTaskStore";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

const TaskModal = ({ isOpen, onClose, initialData = null }) => {
  const { addTask, updateTask } = useTaskStore();

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Todo",
  });
  const [error, setError] = useState("");

  //   modal open data initialize
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "Todo",
      });
    } else {
      setFormData({ title: "", description: "", status: "Todo" });
    }
    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError("Please provide a task title");
      return;
    }

    if (initialData) {
      console.log("upadetTask", { ...initialData, ...formData });
      updateTask({ ...initialData, ...formData });
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
        userId: 1,
      };
      addTask(newTask);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-50 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              {initialData ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {initialData
                ? "Update existing task details"
                : "Add a new task to your board"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div className="space-y-2">
            <Input
              label="Task Title"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="py-3 px-4"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Briefly describe the objective..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400 text-sm"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              Current Status
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["Todo", "In Progress", "Completed"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData({ ...formData, status: s })}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                    formData.status === s
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "bg-white border-slate-200 text-slate-500 hover:border-indigo-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <Button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-100 flex items-center gap-2"
            >
              <CheckCircle2 size={18} />
              {initialData ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

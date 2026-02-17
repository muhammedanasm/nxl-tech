import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import { useDebounce } from "../hooks/useDebounce";
import useTaskStore from "../store/useTaskStore";
import { taskService } from "../services/api";
import { Button } from "../components/ui/Button";
import { Plus, Search, Loader2, AlertCircle, LayoutGrid } from "lucide-react";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

const Dashboard = () => {
  const { tasks, setTasks } = useTaskStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Initial Data Fetch
  useEffect(() => {
    const fetchTasks = async () => {
      if (tasks.length > 0) return;
      setLoading(true);
      setError(null);
      try {
        const data = await taskService.getAll();
        setTasks(data);
      } catch (err) {
        setError("Could not fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // filter search by title
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [tasks, debouncedSearch]);

  const columns = ["Todo", "In Progress", "Completed"];

  // Open modal for editing
  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-4 md:p-8 overflow-y-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <LayoutGrid className="text-indigo-600" size={24} />
                Project Board
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track your team tasks
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
                <input
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                  placeholder="Find a task..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  setTaskToEdit(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus size={18} />{" "}
                <span className="hidden sm:inline">Add Task</span>
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-500">
              <Loader2
                className="animate-spin mb-3 text-indigo-600"
                size={40}
              />
              <p className="font-medium">Syncing your workspace...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="max-w-md mx-auto bg-red-50 border border-red-100 p-6 rounded-2xl text-center">
              <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
              <p className="text-red-700 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-sm text-red-600 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Kanban Board Columns */}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {columns.map((status) => {
                const columnTasks = filteredTasks.filter(
                  (t) => t.status === status,
                );

                return (
                  <div key={status} className="flex flex-col min-h-[200px]">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            status === "Todo"
                              ? "bg-gray-400"
                              : status === "In Progress"
                                ? "bg-amber-400"
                                : "bg-emerald-400"
                          }`}
                        ></span>
                        {status}
                      </h3>
                      <span className="bg-white px-2 py-0.5 rounded text-[10px] font-bold text-gray-400 border shadow-sm">
                        {columnTasks.length}
                      </span>
                    </div>

                    <div className="space-y-4 min-h-[150px] p-2 rounded-2xl transition-colors">
                      {columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onEdit={() => handleEdit(task)}
                        />
                      ))}

                      {columnTasks.length === 0 && (
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl py-12 text-center">
                          <p className="text-xs text-gray-400 italic">
                            No tasks in {status}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/*  Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={taskToEdit}
      />
    </div>
  );
};

export default Dashboard;

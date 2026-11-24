import { useEffect, useState } from "react";
import "./TaskManager.css";

const initialForm = {
  title: "",
  description: "",
};

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  // search + status filter
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); 
  // "all" | "completed" | "open"

  // Derived filtered list
  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (statusFilter === "completed" && !task.completed) return false;
    if (statusFilter === "open" && task.completed) return false;

    // Text search (title + description)
    const text = searchText.toLowerCase();
    return (
      task.title.toLowerCase().includes(text) ||
      task.description.toLowerCase().includes(text)
    );
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    if (editingId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingId
            ? {
                ...task,
                title: form.title.trim(),
                description: form.description.trim(),
              }
            : task
        )
      );

      setEditingId(null);
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        title: form.title.trim(),
        description: form.description.trim(),
        completed: false,
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);
    }

    setForm(initialForm);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function editTask(task) {
    setEditingId(task.id);

    setForm({
      title: task.title,
      description: task.description,
    });
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  function downloadJson() {
    const json = JSON.stringify(tasks, null, 2);
    const blob = new Blob([json], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "tasks.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div class="container">
    <div className="task-manager">
      <h2>Task Manager</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Task" : "Add Task"}
        </button>

        {editingId && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <div className="task-actions">
        <button type="button" onClick={downloadJson}>
          Download JSON
        </button>
        <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="open">Open</option>
      </select>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task ${task.completed ? "completed" : ""}`}
            >
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
              </div>

              <div className="task-buttons">
                <button
                  class="complete-btn"
                  type="button"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  class="edit-btn"
                  type="button"
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>

                <button
                  class="delete-btn"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
}
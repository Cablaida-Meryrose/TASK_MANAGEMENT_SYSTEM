import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = "https://itsmeoww.pythonanywhere.com/api/tasks/";

  // Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!title) return;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: true,
      }),
    });

    setTitle("");
    fetchTasks();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f172a, #1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#0f172a",
            marginBottom: "25px",
          }}
        >
           Task Management System
        </h1>

        {/* Input Section */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "15px",
            }}
          />

          <button
            onClick={addTask}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        <div>
          {tasks.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "gray",
              }}
            >
              No tasks available.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "15px",
                  borderRadius: "12px",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderLeft: task.is_completed
                    ? "6px solid #22c55e"
                    : "6px solid #f59e0b",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "#0f172a",
                    fontWeight: "500",
                  }}
                >
                  {task.title}
                </span>

                <span
                  style={{
                    fontSize: "13px",
                    padding: "6px 10px",
                    borderRadius: "20px",
                    backgroundColor: task.is_completed
                      ? "#dcfce7"
                      : "#fef3c7",
                    color: task.is_completed
                      ? "#166534"
                      : "#92400e",
                    fontWeight: "bold",
                  }}
                >
                  {task.is_completed ? "Completed" : "Pending"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
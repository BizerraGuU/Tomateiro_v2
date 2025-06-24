import { useEffect, useState } from "react"

export default function TaskBoard() {
  const [activeTask, setActiveTask] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem("activeTask")
    if (stored) setActiveTask(JSON.parse(stored))
  }, [])

  function concluirTarefa() {
    if (!activeTask) return
    const updated = { ...activeTask, completed: true }
    localStorage.setItem("activeTask", JSON.stringify(updated))
    setActiveTask(updated)

    // Atualiza as tarefas na lista de tarefas também
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    const updatedTasks = tasks.map((task) =>
      task.id === activeTask.id ? { ...task, completed: true } : task
    )
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))

  }

  function removerDoFoco() {
    localStorage.removeItem("activeTask")
    setActiveTask(null)
  }

  if (!activeTask) return null

  return (
    <div className="w-full max-w-lg mt-10 bg-white p-6 rounded-2xl shadow-xl border border-red-200">
      <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
        🍅 Tarefa em foco
      </h2>
      <div className="flex justify-between items-center">
        <p
          className={`text-lg font-medium ${
            activeTask.completed ? "line-through text-gray-500" : "text-red-900"
          }`}
        >
          {activeTask.name}
        </p>
        <div className="flex gap-2">
          {!activeTask.completed && (
            <button
              onClick={concluirTarefa}
              className="bg-green-500 text-white px-4 py-1.5 text-sm rounded-lg hover:bg-green-600 transition"
            >
              Concluir
            </button>
          )}
          <button
            onClick={removerDoFoco}
            className="bg-red-500 text-white px-4 py-1.5 text-sm rounded-lg hover:bg-red-600 transition"
          >
            Remover foco
          </button>
        </div>
      </div>
    </div>
  )
}

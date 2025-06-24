import { useEffect, useState } from "react"
import TaskItem from "../components/TaskItem"

export default function TaskPage() {
  const [baseTasks, setBaseTasks] = useState([])
  const [userTasks, setUserTasks] = useState([])
  const [hiddenBaseIds, setHiddenBaseIds] = useState([]) 
  const [taskName, setTaskName] = useState("")
  const [allTasks, setAllTasks] = useState([])
  const [isReady, setIsReady] = useState(false)

  // Carrega baseTasks do JSON e hiddenBaseIds do localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))
    const hidden = JSON.parse(localStorage.getItem("hiddenBaseTasks")) || []
    setHiddenBaseIds(hidden)

    if (storedTasks && storedTasks.length > 0) {
      const user = storedTasks.filter((t) => t.origin === "user")
      const base = storedTasks.filter((t) => t.origin === "base")
      setUserTasks(user)
      setBaseTasks(base)
      setIsReady(true)
    } else {
      fetch("/tasks.json")
        .then((res) => res.json())
        .then((json) => {
          const baseFromJson = json.map((task) => ({
            ...task,
            origin: "base",
          }))
          setBaseTasks(baseFromJson)
          setUserTasks([])
          setIsReady(true)
        })
        .catch((err) => {
          console.error("Erro ao carregar JSON:", err)
          setIsReady(true)
        })
    }
  }, [])

  // Atualiza allTasks e salva no localStorage quando estiver pronto
  useEffect(() => {
    if (!isReady) return

    const baseVisiveis = baseTasks.filter(
      (task) => !hiddenBaseIds.includes(task.id)
    )
    const unificados = [...baseVisiveis, ...userTasks]
    setAllTasks(unificados)

    localStorage.setItem("tasks", JSON.stringify(unificados))
    localStorage.setItem("hiddenBaseTasks", JSON.stringify(hiddenBaseIds))
  }, [baseTasks, userTasks, hiddenBaseIds, isReady])

  function handleAddTask(e) {
    e.preventDefault()
    if (!taskName.trim()) return

    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      completed: false,
      origin: "user",
    }

    setUserTasks((prev) => [...prev, newTask])
    setTaskName("")
  }

  function toggleComplete(id) {
    const novasBaseTasks = baseTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )
    const novasUserTasks = userTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    )

    setBaseTasks(novasBaseTasks)
    setUserTasks(novasUserTasks)
  }

  function deleteTask(id) {
    const task = allTasks.find((t) => t.id === id)
    if (!task) return

    if (task.origin === "base") {
      setHiddenBaseIds((prev) => [...new Set([...prev, task.id])])
    } else {
      setUserTasks((prev) => prev.filter((t) => t.id !== id))
    }
  }

  function setActiveTask(task) {
    localStorage.setItem("activeTask", JSON.stringify(task))
    alert(`Tarefa "${task.name}" definida como ativa!`)
  }

  // Contador de tarefas
  const totalTasks = allTasks.length
  const completedTasks = allTasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="w-full max-w-4xl mt-10 bg-white p-6 rounded-2xl shadow-xl text-center relative flex gap-8">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🍅 Minhas Tarefas</h1>

        {/* Formulário para adicionar tarefa */}
        <form onSubmit={handleAddTask} className="space-y-4 mb-6">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Nova tarefa..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-800"
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition font-semibold"
          >
            Adicionar
          </button>
        </form>

        {/* Lista de tarefas */}
        <div className="space-y-2">
          {allTasks.length === 0 ? (
            <p className="text-center text-gray-500">Nenhuma tarefa ainda.</p>
          ) : (
            allTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => toggleComplete(task.id)}
                onDelete={() => deleteTask(task.id)}
                onFocus={() => setActiveTask(task)}
              />
            ))
          )}
        </div>
      </div>

      {/* Contadores de Tarefas à direita */}
      <div className="w-1/3">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Contador de Tarefas</h2>
          <div className="space-y-3 text-lg text-gray-700">
            <p>Total de tarefas: <span className="font-semibold">{totalTasks}</span></p>
            <p>Tarefas pendentes: <span className="font-semibold">{pendingTasks}</span></p>
            <p>Tarefas concluídas: <span className="font-semibold">{completedTasks}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

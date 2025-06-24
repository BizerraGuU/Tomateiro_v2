export default function TaskItem({ task, onToggle, onDelete, onFocus }) {
  return (
    <div
      className={`flex justify-between items-center px-4 py-2 border rounded-md ${
        task.completed ? "bg-green-300 line-through text-gray-500" : "bg-white"
      }`}
    >
      <span className={`${task.completed ? "text-gray-500" : "text-gray-800"}`}>
        {task.name}
      </span>
      <div className="flex gap-2">
        <button
          onClick={onFocus}
          className="text-sm px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Focar
        </button>
        <button
          onClick={onToggle}
          className="text-sm px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
        >
          {task.completed ? "Desfazer" : "Concluir"}
        </button>
        <button
          onClick={onDelete}
          className="text-sm px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          Remover
        </button>
      </div>
    </div>
  )
}

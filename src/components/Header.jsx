import {Link, useLocation} from 'react-router-dom'

export default function Header(){
    const { pathname } = useLocation()

    const linkStyle = (path) => 
        `px-4 py-2 rounded ${
        pathname === path ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-100"
        }`

    return (
        <header className="flex gap-4 p-4 bg-white shadow-md">
            <Link to="/" className={linkStyle("/")}>Pomodoro</Link>
            <Link to="/tasks" className={linkStyle("/tasks")}>Tarefas</Link>
            <Link to="/settings" className={linkStyle("/settings")}>Configurações</Link>
        </header>    
    )

}
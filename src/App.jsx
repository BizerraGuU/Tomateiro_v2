import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Timer from "./pages/Index"
import TaskPage from "./pages/TaskPage"
import SettingsPage from "./pages/SettingsPage"

export default function App() {
  return (
      <Routes>
       <Route path="/" element={<Layout />}>
          <Route index element={<Timer />} />
          <Route path="/tarefas" element={<TaskPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
       </Route>
      </Routes>
  )
}

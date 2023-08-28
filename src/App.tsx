import { useRoutes } from "react-router-dom"
import { router } from "./router/Index"



function App() {

  return (
    <div>
      {useRoutes(router)}
    </div>
  )
}

export default App
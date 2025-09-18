import { RouterProvider } from "react-router-dom";
import { router } from "./presentation/routes/index";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

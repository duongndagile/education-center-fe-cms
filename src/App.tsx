import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Provider } from "./components/UI/provider";
import { ToastContainer } from "./helpers/toaster";

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;

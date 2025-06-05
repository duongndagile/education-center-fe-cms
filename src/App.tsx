import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Provider } from "./components/UI/provider";
import { createStandaloneToast } from "@chakra-ui/toast";

const { ToastContainer } = createStandaloneToast({
  defaultOptions: { duration: 3000, position: "top-right" },
});

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;

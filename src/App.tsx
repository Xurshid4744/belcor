import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { NavigationScroll } from "@/layout";
import { Snackbar } from "@/ui-components";

function App() {
  return (
    <NavigationScroll>
      <RouterProvider router={router} />
      <Snackbar />
    </NavigationScroll>
  );
}

export default App;

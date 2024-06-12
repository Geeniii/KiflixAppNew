import { NavBar } from "./assets/Components/NavBar";
import { AuthContextProvider } from "./Context/AuthContext";

function App(props) {
  return (
    <>
      <AuthContextProvider>
        <NavBar/>
        {props.children}
      </AuthContextProvider>
    </>
  );
}

export default App;

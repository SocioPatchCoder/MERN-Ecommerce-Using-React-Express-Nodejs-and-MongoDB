
import { BrowserRouter as Router} from "react-router-dom"
import {DataProvider} from "./GlobalState"
import Header from "./components/header/Header"
import MainPages from './components/mainpages/Pages'

function App() {
  return (
    <DataProvider>
      <Router>
    <div className="App">
      <Header/>
      <MainPages/>
    </div>
    </Router>
    </DataProvider>
  );
}

export default App;

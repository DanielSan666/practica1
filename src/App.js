import './App.css';
import { Ingresar } from './pages/Ingresar';
import { SessionContext } from './components/SessionContext';
import { useContext } from 'react'
import PaginaPrincipal from './pages/PantallaInicio';


function App() {

  const {isLogged} = useContext(SessionContext)

  return (
    
    <div className="App">

    {!isLogged ? <Ingresar/> :<PaginaPrincipal/>}

      {/*<Suscribir/>*/}
     
    </div>
  );
}

export default App;

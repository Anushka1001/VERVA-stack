import Home from './components/Home';
import { AuthProvider } from './components/Auth';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;

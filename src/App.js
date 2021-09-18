import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter  } from 'react-router-dom'
import Home from './pages/home/home';
import Contact from './pages/contact/contact';
import About from './pages/introduce/introduce';
import Login from './pages/login/login';
import NotFoundPage from './pages/notFound/notfound';
import Register from './pages/register/register';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component = {Home}/>
        <Route path='/introduce' exact component = {About}/>
        <Route path='/contact' exact component = {Contact}/>
        <Route path='/login' exact component = {Login}/>
        <Route path='/register' exact component = {Register}/>

        <Route component = {NotFoundPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
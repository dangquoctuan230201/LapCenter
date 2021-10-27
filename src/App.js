import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter  } from 'react-router-dom'
import Home from './pages/home/home';
import Contact from './pages/contact/contact';
import About from './pages/introduce/introduce';
import Login from './pages/login/login';
import NotFoundPage from './pages/notFound/notfound';
import Register from './pages/register/register';
import ProductDetail from './pages/productDetail/productDetail';
import Footer from './components/footer/footer';
import Buy from './pages/buy/buy';
import History from './pages/history/history';
import Cart from './pages/cart/cart';
import ManageOrder from './pages/admin/order/manageOrder';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component = {Home}/>
        <Route path='/introduce' exact component = {About}/>
        <Route path='/contact' exact component = {Contact}/>
        <Route path='/login' exact component = {Login}/>
        <Route path='/register' exact component = {Register}/>
        <Route path='/product/:id' exact component = {ProductDetail}/>
        <Route path='/footer' exact component = {Footer}/>
        <Route path='/buy/:id' exact component = {Buy}/>
        <Route path='/history/:userId' exact component = {History}/>
        <Route path='/cart/:cartId' exact component = {Cart}/>
        <Route path='/admin/order' exact component = {ManageOrder}/>

        

        <Route component = {NotFoundPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

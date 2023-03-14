import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {  LoginUsers } from './components/login/loginForm';
import { SignupUsers } from './components/signup/signupUsers';
import { RootLayout } from './layouts/rootLayout';
import { Home } from './pages/home/home';
import { NotFound } from './pages/home/notFound';
import AddImageForm from './pages/photos/profilePhotos';
import { ProfilePictureForm } from './components/login/updateProfile';

const router=createBrowserRouter(
  

  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route  index element={<Home/>}/>
      <Route path='signup' element={<SignupUsers/>}/>
      <Route 
        path='login'
        element={<LoginUsers/>}
       
      />
      <Route 
      path='pictures'
      element={<AddImageForm />}
    
      />
      <Route 
        path='profile'
        element={<ProfilePictureForm/>}
      />
      <Route path='*' element={<NotFound/>}/>
      
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

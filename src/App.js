import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import React, { Suspense } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
const SignUp = React.lazy(() => import('./pages/Signup/SingUp'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const Login = React.lazy(() => import('./pages/Login/LogInForm'));;
const RecipeDetails = React.lazy(() => import('./pages/RecipeDetailsPage/RecipeDetailsPage'));



function App() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      <div className="main-container">
        {!hideHeaderFooter && <Header />}
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route path="recipedetails/:id" element={<RecipeDetails />} />
            </Routes>
          </Suspense>
        </div>
        {!hideHeaderFooter && <Footer />}
      </div>
    </>
  );
}

export default App;

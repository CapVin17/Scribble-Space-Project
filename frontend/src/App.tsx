import './App.css'
import { Signin } from './pages/signin';
import { Signup } from './pages/signup';
import { Blog } from './pages/blog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Blogs } from './pages/blogs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path='/blogs' element={<Blogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

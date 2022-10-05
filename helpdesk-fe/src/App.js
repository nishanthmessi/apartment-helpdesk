import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MainForm from './components/MainForm'
import Success from './components/Success'
import Status from './components/Status'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const App = () =>  {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new-issue' element={<MainForm/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/ticket/:id' element={<Status/>}/>
        <Route path='/*' element={<NotFound/>}/>
        {/* <Route path='*' element={<MainForm/>}/> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
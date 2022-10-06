import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MainForm from './components/MainForm'
import Success from './components/Success'
import Status from './components/Status'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export const CommonContext = React.createContext()
const apiurl = 'http://localhost:8000'

const App = () =>  {
  return (
    <>
    <BrowserRouter>
      <CommonContext.Provider value={{apiurl}}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/new-issue' element={<MainForm/>}/>
          <Route path='/success/:id' element={<Success/>}/>
          <Route path='/ticket/:id' element={<Status/>}/>
          <Route path='/*' element={<NotFound/>}/>
          {/* <Route path='*' element={<MainForm/>}/> */}
        </Routes>
      </CommonContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
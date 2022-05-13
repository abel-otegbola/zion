import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router } from 'react-router-dom'
import Cookies from 'js-cookie'
import Application from './routes'
import './App.css'
import 'antd/dist/antd.css'
import 'react-phone-number-input/style.css'
import 'react-toastify/dist/ReactToastify.css'
import SearchCollectionContext from './Context/SearchCollectionContext'
import { searchCollecton } from './API/CollectionsDataAPI'
import ErrorBoundary from './hoc/ErrorBoundary'

const App = () => {
  const [collections, setCollections] = React.useState([])

  React.useEffect(() => {
    FetchData()
    window.addEventListener('load', () => {
      sessionStorage.removeItem('collection_filter')
    })
  }, [])

  const isAuthed = () => {
    const jwt_data = Cookies.get('auth-jwt')
    return jwt_data ? true : false
  }

  const FetchData = async () => {
    if (!isAuthed()) return
    const data = await searchCollecton()
    setCollections([...data.data])
  }

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose='2500'
        closeButton='false'
      />
      <ErrorBoundary>
        <SearchCollectionContext.Provider value={{ collections }}>
          <Router>
            <Application />
          </Router>
        </SearchCollectionContext.Provider>
      </ErrorBoundary>
    </>
  )
}
export default App

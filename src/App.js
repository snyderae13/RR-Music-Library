import {  useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import './App.css'
import { DataContext} from './context/DataContext'
import { SearchContext } from './context/SearchContext'

function App() {
  let [message, setMessage] = useState('Search for Music!');
  let [data, setData] = useState([]);
  let searchInput = useRef('');

  const API_URL = `https://itunes.apple.com/search?term=`;

  const handleSearch = (e, term) => {
    e.preventDefault();
    const fetchData = async () => {
      document.title = `${term}`;
      const response = await fetch(API_URL + term.replace(" ", "%"));
      const resData = await response.json();
      if (resData.results.length > 0) {
        return setData(resData.results)
      } else {
        return setMessage('Not Found')
      }
    }
    fetchData()
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <div>
              <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
                }}>
                <SearchBar/>
              </SearchContext.Provider>

              <DataContext.Provider value={data} >
                <Gallery />
              </DataContext.Provider >
            </div>
          } />
          <Route path="/album/:id" element={
            <DataContext.Provider value={data} >
              <AlbumView />
            </DataContext.Provider>
              } />
          <Route path="/artist/:id" element={
            <DataContext.Provider value={data} >
              <ArtistView />
            </DataContext.Provider>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
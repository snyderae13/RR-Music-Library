import {  useState, useRef } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import './App.css'
import { DataContext} from './context/DataContext'
import { SearchContext } from './context/SearchContext'

function App(){
  let [message, setMessage] = useState('Search for Music!');
  let [data, setData] = useState([]);
  let searchInput = useRef('');

  const handleSearch = (e, term) => {
    e.preventDefault()
    fetch(`https://itunes.apple.com/search?term=${term}`)
    .then(response => response.json())
    .then(resData => {
      if (resData.results.length > 0) {
        return setData(resData.results)
      } else {
        return setMessage('Not Found.')
      }
    })
    .catch(err => setMessage('An Error has Occurred!'))
  }
  return (
      <div>
        {message}
        <Router>
          <Routes>
            <Route path="/" element={<div>
              <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
                <SearchBar />
              </SearchContext.Provider>
              <DataContext.Provider value={data}>
                <Gallery />
              </DataContext.Provider>
              </div>} />
            <Route path="/album/:id"
              element={<AlbumView />} />
            <Route path="/artist/:id"
              element={<ArtistView />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
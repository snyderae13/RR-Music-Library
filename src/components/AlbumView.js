// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'


const AlbumView = () => {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])
    const navigate = useNavigate()
    const data = useContext(DataContext)


    useEffect(() => {
        const API_URL = `https://itunes.apple.com/lookup?id=${id}&entity=song`;
        
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const resData = await response.json();
            setAlbumData(resData.results);
        }
        fetchData();
    }, [id])

    const justSongs = albumData.filter(entry => entry.kind === 'song')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    return (
        <div>
            {navButtons()}
            {albumData.length > 0 ? <h2>{albumData[0].collectionName}</h2> : <h2>Loading...</h2>}
            {renderSongs}
        </div>
    )
}

export default AlbumView
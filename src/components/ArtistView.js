<<<<<<< HEAD
// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const ArtistView = () => {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const navigate = useNavigate()

=======
import { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import Spinner from './Spinner'

const ArtistView = () => {
    const { id } = useParams()
    const history = useHistory()
    const [ artistData, setArtistData ] = useState([])
    
>>>>>>> 1845f494934018f7af50219d3a79de77d114b67b
    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
<<<<<<< HEAD
            
=======
>>>>>>> 1845f494934018f7af50219d3a79de77d114b67b
        }
        fetchData()
    }, [id])

<<<<<<< HEAD


    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    const renderAlbums = justAlbums.map((album, i ) =>{
=======
    const allAlbums = artistData.filter(entity => entity.collectionType === 'Album')
    .map((album, i) => {
>>>>>>> 1845f494934018f7af50219d3a79de77d114b67b
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
<<<<<<< HEAD

            </div>
        )
    })


    return (
        <div>
            {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> :<h2>Loading...</h2> }
            {navButtons()}
            {renderAlbums}
=======
            </div>)
        })

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => {history.push('/')}}>Home</button> |
                <button onClick={() => {history.goBack()}}>Back</button>
            </div>
        )
    }

    return (
        <div>
            {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <Spinner />}
            {navButtons()}
            {allAlbums}
>>>>>>> 1845f494934018f7af50219d3a79de77d114b67b
        </div>
    )
}

<<<<<<< HEAD
    


=======
>>>>>>> 1845f494934018f7af50219d3a79de77d114b67b
export default ArtistView
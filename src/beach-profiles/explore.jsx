import Header from '../header'
import './explore.css'
import beaches from './beaches.js'

function Explore(){
    return (
        <div className="explore-container">
            <Header/>
            <h1 className="title">Explore Beaches</h1>
            <div className='beach-boxes'>
                {beaches.map((beach) => (
                    <div className={`beach-box ${beach.name.toLowerCase()}`} key={beach.name}>
                        <div className='beach-text'>
                            <h2>{beach.name}</h2>
                            <div className="beach-caption">
                                {beach.captions.map((caption, i) => <p key={i}>{caption}</p>)}
                            </div>
                        </div>
                        <img className='beach-image' src={beach.image} alt={beach.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Explore

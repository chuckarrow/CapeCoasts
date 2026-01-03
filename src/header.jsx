import './header.css'
import { useNavigate } from 'react-router-dom'

function BottomBanner(){
    return (
        <div className="bottom-banner">
        <p>We are looking for sponsors!</p>
        </div>
    )
}

function Header() {
    const navigate = useNavigate();
    return(
        <div className='header' onClick={() => navigate('/')}>
        <h1>Cape Beaches</h1>
        <BottomBanner />
        </div>
    )
}



export default Header
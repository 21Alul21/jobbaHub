
import '../components.css'
import { Link } from 'react-router-dom';
import PostJob from '../pages/post_job';
import { useState } from 'react';

const   Header = () =>{

    const [hamburgerState, setHamburgerState] = useState(false);
    const [color, setColor] = useState("white");

    const handleHamburgerMenu = () =>{
        setHamburgerState(!hamburgerState);

        return (color === "white" ? setColor("red") : setColor("white"));
        
    }


    return(
        <>
        
        <header >

            <nav>
                <ul style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <li ><Link className='Link' to='/'>Jobba Hub</Link> </li>
                    <li><Link className='Link' to='/post-job/'>Post Job Opening</Link></li>
                    {!localStorage.getItem("access") &&
                    (<li><Link className='Link' to={"/login/"}>Sign in</Link></li> 
                    )}
                </ul>
                <div onClick={handleHamburgerMenu} style={{height:"100%", width: "40px", display: "flex", flexDirection: "column", justifyContent: "space-around", marginLeft: "50px", cursor: "pointer"}}><span style={{ width: "100%", height: "10%", backgroundColor: color  }}></span><span style={{ width: "100%", height: "10%", backgroundColor: "white"  }}></span><span style={{ width: "100%", height: "10%", backgroundColor: color  }}></span></div>
            </nav>

            {hamburgerState && (
                <>
            <div style={{ width: "100%", height: "250px",  zIndex: "1", position: "absolute", top: "5%", left: "10", backgroundColor: "green" }}>
                <ul>
                    <li style={{padding: "10px", textAlign: 'center' }}><Link style={{ textDecoration: "none", color: "White", textAlign: "center" }} to="/logout/" >Logout</Link></li>
                    <hr/>
                    <li style={{ padding: "10px", textAlign: 'center' }}><Link style={{ textDecoration: "none", color: "White", textAlign: "center" }} to="/profile/" >Profile</Link></li>
                    <hr/>
                    <li style={{ padding: "10px", textAlign: 'center' }}><Link style={{ textDecoration: "none", color: "White", textAlign: "center" }} to="/jobs-applied/" >Job Applications</Link></li>
                    <hr/>
                    <li style={{padding: "10px", textAlign: 'center' }}><Link style={{ textDecoration: "none", color: "White", textAlign: "center" }} to="/jobs-posted/" >Jobs Posted</Link></li>
                    <hr/>
                </ul>

                
                
            </div>
            </>
        )}

        </header>

        </>

    );
}


export default Header;
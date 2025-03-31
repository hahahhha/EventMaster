import './mainblock.css';
import pic from './assets/pic.jpg';
function Mainpageblock() {
    return (
        <main>
            <div className="leftside">
                <div>
                <h1>
                    Учись,<br></br> общайся,<br></br> развивайся!
                </h1>
                <button className='startbtn'>Начать</button>
                </div>
            </div>
            <div className="rightside">
                <img src={pic} alt="Картина красота"></img>

            </div>
        </main>
    )
}

export default Mainpageblock;
import styles from '../styles/mainblock.module.css';
import pic from '../assets/logo.png';
function Mainpageblock() {
    return (
        <main>
            <div className={styles.leftside}>
                <div>
                <h1 className={styles.title}>
                    Учись,<br></br> общайся,<br></br> развивайся!
                </h1>
                <button className={styles.startbtn}>Начать</button>
                </div>
            </div>
            <div className={styles.rightside}>
                <img src={pic} alt="Картина красота"></img>
            </div>
        </main>
    )
}

export default Mainpageblock;
import styles from '../styles/headerStyles.module.css';
function Header() {
    return (
        <>
            <header>
                <div className={styles.logoblock}>
                    <a className={styles.logolink} href="/main">ProWeb</a>
                </div>
                <div className={styles.authblock}>
                    <a href="/register">Регистрация</a>
                    <a href="/login">Войти</a>
                    <a href="/">Ещё</a>
                </div>
            </header>
    </>
    )
}

export default Header;
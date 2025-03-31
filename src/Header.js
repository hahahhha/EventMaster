import './headerStyles.css';
// import './test.css';
function Header() {
    return (
        <>
    <header>
        <div className="logoblock">
            <a className="logolink" href="/main">ProWeb</a>
        </div>
        <div className="authblock">
            <a href="/register">Регистрация</a>
            <a href="/login">Войти</a>
        </div>
    </header>
    </>
    )
}

export default Header;
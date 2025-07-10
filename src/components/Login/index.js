import './Login.module.css';


function Login(){
    return(
        <div className="login-container">
            <></>
            <div className=''>
        <form className='login-form'>
            <h1>Login</h1>
            <input type="email" placeholder='Email'/>
            <input type="passoword" placeholder='Senha'/>
            <button type="submit">Entrar</button>
            <p>Não tem uma conta? <a href="./register">Registrar</a></p>
        </form>
            </div>
        </div>
    )
}

export default Login;
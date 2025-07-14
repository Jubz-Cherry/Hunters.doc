import './Login.module.css';

function Login(){
    return(
        <div className="login-container">
            <div className=''>
        <form className='login-form'>
            <h1>Login</h1>
            <input type="email" placeholder='Email'/>
            <input type="passoword" placeholder='Senha'/>
            <button type="submit">< a href="./Home">Entrar</a></button>
            <p>Não tem uma conta? <a href="./Register">Registrar</a></p>
        </form>
            </div>
        </div>
    )
}

export default Login;
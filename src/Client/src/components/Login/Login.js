import "../Register/Register.css";

function Login() {
	return (
		<form className="mx-auto col-10 col-md-8 col-lg-5 form-group">
			<h2>Login</h2>
			<div className="register-form-inputs">
				<input
					className="form-control col-8 col-md-8"
					type="name"
					placeholder="Username"
				/>
				<input
					className="form-control col-8 col-md-8"
					type="password"
					placeholder="Password"
				/>
			</div>

			<button
				className="btn btn-primary col-8 col-lg-3 my-5"
				type="submit"
			>
				Login
			</button>
		</form>
	);
}

export default Login;

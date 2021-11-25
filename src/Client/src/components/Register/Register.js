import "./Register.css";

function Register() {
	return (
		<form className="register-form mx-auto col-10 col-md-8 col-lg-5 form-group">
			<h2>Register</h2>
			<div className="register-form-inputs">
				<input
					className="form-control col-8 col-md-8"
					type="name"
					placeholder="Username"
				/>
				<input
					className="form-control col-8 col-md-8"
					type="email"
					placeholder="Email"
				/>
				<input
					className="form-control col-8 col-md-8"
					type="password"
					placeholder="Password"
				/>
				<input
					className="form-control col-8 col-md-8"
					type="password"
					placeholder="Confirm Password"
				/>
			</div>

			<button
				className="btn btn-primary col-8 col-lg-3 my-5"
				type="submit"
			>
				Register
			</button>
		</form>
	);
}

export default Register;

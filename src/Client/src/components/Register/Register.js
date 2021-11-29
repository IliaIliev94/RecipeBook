import { register } from "../../services/authService";
import "./Register.css";

function Register({ authHandler }) {
	const registerUser = async (event) => {
		event.preventDefault();
		let formData = new FormData(event.currentTarget);
		let username = formData.get("username");
		let email = formData.get("email");
		let password = formData.get("password");
		let confirmPassword = formData.get("confirmPassword");
		if (password !== confirmPassword) {
			alert("Password and password confirmation must match");
			return;
		}
		const result = await register(
			username,
			email,
			password,
			confirmPassword
		);
		await authHandler();
		console.log(result);
	};
	return (
		<form
			className="register-form mx-auto col-10 col-md-8 col-lg-5 form-group"
			onSubmit={registerUser}
		>
			<h2>Register</h2>
			<div className="register-form-inputs">
				<input
					className="form-control col-8 col-md-8"
					type="name"
					placeholder="Username"
					name="username"
					required
				/>
				<input
					className="form-control col-8 col-md-8"
					type="email"
					placeholder="Email"
					name="email"
					required
				/>
				<input
					className="form-control col-8 col-md-8"
					type="password"
					placeholder="Password"
					name="password"
					required
				/>
				<input
					className="form-control col-8 col-md-8"
					type="password"
					placeholder="Confirm Password"
					name="confirmPassword"
					required
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

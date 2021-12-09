import { login } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../helpers/validateHelper";
import "../Register/Register.css";

function Login({ authHandler }) {
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const loginUser = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { username, password } = Object.fromEntries(formData);
		const validationErrors = validateLogin(username, password);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		const result = await login(username, password);
		console.log(result);
		if (result.status !== 200) {
			console.log(result);
			const exception = await result.json();
			for (const [key, value] of Object.entries(exception)) {
				setErrors({ [key.toLowerCase()]: value[0] });
			}
			return;
		}

		authHandler();
		navigate("/");
	};
	return (
		<form
			className="mx-auto col-10 col-md-8 col-lg-5 form-group"
			onSubmit={loginUser}
		>
			<h2>Login</h2>
			<div className="register-form-inputs">
				<div className="col-10 text-left mx-auto">
					<label for="username">Username</label>
					<input
						className="form-control"
						type="name"
						placeholder="Username"
						name="username"
						id="username"
					/>
					{errors.username && (
						<p className="form-error">{errors.username}</p>
					)}
				</div>

				<div className="col-10 text-left mx-auto">
					<label for="password">Password</label>
					<input
						className="form-control"
						type="password"
						placeholder="Password"
						name="password"
						id="password"
					/>
					{errors.password && (
						<p className="form-error">{errors.password}</p>
					)}
				</div>
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

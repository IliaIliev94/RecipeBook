import { authLogin } from "../../services/authService";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../helpers/validateHelper";
import { useAuth } from "../../contexts/AuthContext";
import "../Register/Register.css";

function Login() {
	const [errors, setErrors] = useState({});
	const { login } = useAuth();
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

		const result = await authLogin(username, password);

		if (result.status !== 200) {
			const exception = await result.json();
			for (const [key, value] of Object.entries(exception)) {
				setErrors({ [key.toLowerCase()]: value[0] });
			}
			return;
		}
		const userData = await result.json();

		login(userData.username, userData.userImage);
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

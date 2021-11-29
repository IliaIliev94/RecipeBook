import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";

function Login({ authHandler }) {
	const navigate = useNavigate();
	const loginUser = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const username = formData.get("username");
		const password = formData.get("password");
		const result = await login(username, password);
		if (result.status !== 200) {
			alert("Wrong input data! Try again!");
		} else {
			await authHandler();
			navigate("/");
		}

		console.log(result);
	};
	return (
		<form
			className="mx-auto col-10 col-md-8 col-lg-5 form-group"
			onSubmit={loginUser}
		>
			<h2>Login</h2>
			<div className="register-form-inputs">
				<input
					className="form-control col-8 col-md-8"
					type="name"
					placeholder="Username"
					name="username"
				/>
				<input
					className="form-control col-8 col-md-8"
					type="password"
					placeholder="Password"
					name="password"
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

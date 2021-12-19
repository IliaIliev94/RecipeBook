import { register } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router";
import { validateRegister } from "../../helpers/validateHelper";
import { useAuth } from "../../contexts/AuthContext";
import "./Register.css";
import img from "../../assets/Avatars/default-avatar.png";

function Register() {
	const [image, setImage] = useState({ imageSrc: img, imageFile: null });
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { login } = useAuth();

	const registerUser = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { username, email, password, confirmPassword } =
			Object.fromEntries(formData);

		const validationErrors = validateRegister(
			username,
			email,
			password,
			confirmPassword
		);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(
				validateRegister(username, email, password, confirmPassword)
			);
			return;
		}

		const result = await register(formData);

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

	const showPreview = (e) => {
		console.log(e.target);
		if (e.target.files && e.target.files[0]) {
			let imageFile = e.target.files[0];
			const reader = new FileReader();
			reader.onload = (x) => {
				setImage({ imageFile, imageSrc: x.target.result });
			};
			reader.readAsDataURL(imageFile);
		} else {
			setImage({
				imageFile: null,
				imageSrc: img,
			});
		}
	};

	return (
		<form
			className="register-form mx-auto col-10 col-md-8 col-lg-5 form-group"
			onSubmit={registerUser}
		>
			<h2>Register</h2>
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
					<label for="email">Email</label>
					<input
						className="form-control"
						type="email"
						placeholder="Email"
						name="email"
						id="email"
					/>
					{errors.email && (
						<p className="form-error">{errors.email}</p>
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
				<div className="col-10 text-left mx-auto">
					<label for="confirmPassword">Confirm password</label>
					<input
						className="form-control"
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						id="confirmPassword"
					/>
					{errors.confirmPassword && (
						<p className="form-error">{errors.confirmPassword}</p>
					)}
				</div>

				<div className="col-10 text-center mx-auto">
					<img src={image.imageSrc} className="avatar" />

					<label for="avatar">Avatar</label>

					<input
						className="form-control"
						type="file"
						placeholder="Avatar"
						name="avatar"
						id="avatar"
						onChange={showPreview}
					/>
				</div>
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

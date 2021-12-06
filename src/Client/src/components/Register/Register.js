import { register } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Register.css";
import img from "../../assets/Avatars/default-avatar.png";

function Register({ authHandler }) {
	const [image, setImage] = useState({ imageSrc: img, imageFile: null });
	const navigate = useNavigate();
	const registerUser = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { username, email, password, confirmPassword } =
			Object.fromEntries(formData);

		if (password !== confirmPassword) {
			alert("Password and password confirmation must match");
			return;
		}

		const result = await register(formData);

		console.log("Result");
		console.log(result);

		if (result.status !== 200) {
			alert("Wrong input data! Try again!");
			return;
		}

		authHandler();
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
				<label for="username">Username</label>
				<input
					className="form-control col-8 col-md-8"
					type="name"
					placeholder="Username"
					name="username"
					id="username"
					required
				/>
				<label for="email">Email</label>
				<input
					className="form-control col-8 col-md-8"
					type="email"
					placeholder="Email"
					name="email"
					id="email"
					required
				/>
				<label for="password">Password</label>
				<input
					className="form-control col-8 col-md-8"
					type="password"
					placeholder="Password"
					name="password"
					id="password"
					required
				/>
				<label for="confirmPassword">Confirm password</label>
				<input
					className="form-control col-8 col-md-8"
					type="password"
					placeholder="Confirm Password"
					name="confirmPassword"
					id="confirmPassword"
					required
				/>
				<img src={image.imageSrc} className="avatar" />
				<label for="avatar">Avatar</label>

				<input
					className="form-control col-8 col-md-8"
					type="file"
					placeholder="Avatar"
					name="avatar"
					id="avatar"
					onChange={showPreview}
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

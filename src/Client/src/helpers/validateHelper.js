export const validateRegister = (
	username,
	email,
	password,
	confirmPassword
) => {
	let errors = {};

	if (!username) {
		errors.username = "Username cannot be empty!";
	}
	if (!email) {
		errors.email = "Email can't be null!";
	} else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		errors.email = "Invalid email format!";
	}
	if (password !== confirmPassword) {
		errors.password = "Password and password confirmation must match!";
		errors.confirmPassword =
			"Password and password confirmation must match!";
	}

	return errors;
};

export const validateLogin = (username, password) => {
	let errors = {};

	if (!username) {
		errors.username = "Username can't be empty";
	}

	if (!password) {
		errors.password = "Password can't be empty";
	}

	return errors;
};

export const validateRecipe = (
	title,
	imageURI,
	description,
	minMinutes,
	maxMinutes
) => {
	const errors = {};

	if (!title) {
		errors.title = "Title can't be empty";
	} else if (title.length < 3) {
		errors.title = "Title has to be at least two characters long!";
	}
	if (!imageURI) {
		errors.imageURI = "Image URI can't be empty!";
	}
	if (!description) {
		errors.description = "Description can't be empty!";
	}
	if (!minMinutes) {
		errors.minMinutes = "Minimal minutes can't be empty!";
	}
	if (!maxMinutes) {
		errors.maxMinutes = "Maximum minutes can't be empty!";
	}

	return errors;
};

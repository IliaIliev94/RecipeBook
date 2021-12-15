function AddComment({ avatar, submitHandler }) {
	const clearForm = (e) => {
		e.currentTarget.parentNode.parentNode.parentNode.reset();
	};
	return (
		<form
			data-testid="comment-submit-form"
			action="#"
			onSubmit={(e) => {
				e.preventDefault();
				const comment = new FormData(e.currentTarget).get("comment");
				submitHandler(comment);
				e.currentTarget.reset();
			}}
		>
			<div class="bg-light p-2">
				<div class="d-flex flex-row align-items-start">
					<img class="rounded-circle" src={avatar} width="40" />
					<textarea
						data-testid="submit-comment-form-text"
						class="form-control ml-1 shadow-none textarea"
						name="comment"
					></textarea>
				</div>
				<div class="mt-2 text-right">
					<button
						class="btn btn-primary btn-sm shadow-none"
						type="submit"
					>
						Post comment
					</button>
					<button
						onClick={clearForm}
						class="btn btn-outline-primary btn-sm ml-1 shadow-none"
						type="button"
					>
						Cancel
					</button>
				</div>
			</div>
		</form>
	);
}

export default AddComment;

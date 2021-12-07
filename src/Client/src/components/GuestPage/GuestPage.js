import "./GuestPage.css";
import { Link } from "react-router-dom";
import FeatureImage from "../FeatureImage/FeatureImage";
import HomeCard from "../HomeCard/HomeCard";

function GuestPage() {
	return (
		<>
			<FeatureImage background="./images/static/guest.jpg">
				<div className="overlay">
					<section className="overlay-heading-container">
						<h1 className="display-1">RecipeBook</h1>
						<h2 className="display-4 my-3">
							An app where you can create and share recipes
						</h2>
					</section>

					<section className="overlay-cta-container">
						<Link
							className="btn btn-outline-secondary"
							to="/register"
						>
							Sign up
						</Link>
						<Link className="btn btn-outline-secondary" to="/login">
							Log in
						</Link>
					</section>
				</div>
			</FeatureImage>
			<div className="container mt-5">
				<h2 className="my-5">A repository of user created recipes</h2>
				<div className="row">
					<HomeCard
						title="View recipes"
						icon={<i className="fas fa-utensils"></i>}
					>
						Have a look at our wide range of delicous and unique
						meals with detailed descriptions of how to prepare and
						approximate cooking duration.
					</HomeCard>
					<HomeCard
						title="Add recipes"
						icon={<i className="fas fa-plus-circle"></i>}
					>
						Create a profile and add recipes to your collection,
						that can be viewed and shared with other users
					</HomeCard>
					<HomeCard
						title="Modify recipes"
						icon={<i class="fas fa-edit"></i>}
					>
						Keep track of your collection of recipes and edit/delete
						them when you see as fit
					</HomeCard>
				</div>
			</div>
		</>
	);
}

export default GuestPage;

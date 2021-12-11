import { useAuth } from "../../contexts/AuthContext";
import GuestPage from "../../components/GuestPage/GuestPage";
import UserProfile from "../../components/UserProfile/UserProfile";
import Loader from "../Loader/Loader";

function HomePage() {
	const { isAuthenticated } = useAuth();
	return (
		<>
			{isAuthenticated !== null ? (
				isAuthenticated ? (
					<UserProfile isInUserProfile={true} />
				) : (
					<GuestPage />
				)
			) : (
				<Loader />
			)}
		</>
	);
}

export default HomePage;

import React, { useContext, useEffect, useState } from "react";
import { ArrowLeftCircle } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import GlobalContext from "../../context/GlobalContext";
import Row, { Col } from "../../layout/Responsive";
import { searchEmpty } from "../../utils/images";
import "../Profile/profile.css";

const UserProfile = () => {
	const { username } = useParams();
	const navigate = useNavigate();
	const [profileUser, setProfileUser] = useState({});
	const [userFound, setUserFound] = useState(false);
	const { getUserProfile } = useContext(GlobalContext);
	useEffect(() => {
		const fetUserProfile = async () => {
			const res = await getUserProfile(username);
			setUserFound(() => (res ? true : false));
			setProfileUser(() => ({ ...res }));
		};
		fetUserProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<main className="profile">
			<section className="profile-head">
				<button
					className="main-cover-back"
					onClick={() => navigate(-1)}
				>
					<ArrowLeftCircle /> Go Back
				</button>
				<button className="main-cover-save dispn"></button>
			</section>
			{userFound ? (
				<section className="profile-container">
					<div className="profile-image">
						<img
							src={profileUser.avatar}
							alt={profileUser.username}
						/>
					</div>
					<div className="profile-content">
						<form className="profile-form">
							<Row>
								<Col lg={100} md={50} sm={100}>
									<Input
										type="text"
										name="name"
										disabled
										value={
											profileUser?.fname +
											" " +
											profileUser?.lname
										}
										placeholder="Your Name"
										title="Your Name"
										icon="person"
									/>
								</Col>
								<Col lg={50} md={50} sm={100}>
									<Input
										type="text"
										name="username"
										icon="account_circle"
										disabled
										value={profileUser?.username}
										placeholder="Username"
										title="Username is not editable"
									/>
								</Col>
								<Col lg={50} md={50} sm={100}>
									<Input
										type="text"
										name="bio"
										icon="tips_and_updates"
										disabled
										value={profileUser?.bio}
										placeholder="Short Bio"
									/>
								</Col>
								<Col lg={50} md={50} sm={100}>
									<Input
										type="email"
										name="email"
										icon="mail"
										disabled
										value={profileUser?.email}
										placeholder="Email Address"
									/>
								</Col>
								<Col lg={50} md={50} sm={100}>
									<Input
										type="tel"
										name="phone"
										icon="call"
										disabled
										value={profileUser?.phone}
										placeholder="Phone No."
									/>
								</Col>
								<Col lg={100} md={50} sm={100}>
									<Input
										type="url"
										name="avatar"
										icon="image"
										disabled
										value={profileUser?.avatar}
										placeholder="Avatar"
									/>
								</Col>
							</Row>
							<Button className="dispn" type="submit" />
						</form>
					</div>
				</section>
			) : (
				<section className="profile-container profile-null">
					<div className="profile-null-image">
						<img src={searchEmpty} alt="No User Found" />
					</div>
					<h2>Could not find a profile for user "{username}"</h2>
				</section>
			)}
		</main>
	);
};

export default UserProfile;

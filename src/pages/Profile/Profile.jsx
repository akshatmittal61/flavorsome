import React, { useContext, useEffect, useState } from "react";
import { ArrowLeftCircle, Edit, ExternalLink, Save } from "react-feather";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import RecipeFlex from "../../components/Recipe/RecipeFlex";
import GlobalContext from "../../context/GlobalContext";
import Masonry, { MasonryBox } from "../../layout/Masonry/Masonry";
import Row, { Col } from "../../layout/Responsive";
import { userFallBackImg } from "../../utils/images";
import "./profile.css";

const Profile = () => {
	const {
		user,
		axiosInstance,
		setIsLoading,
		setSnack,
		setOpenSnackBar,
		updateUser,
		getAllRecipesByUsername,
	} = useContext(GlobalContext);
	const [profileUser, setProfileUser] = useState({
		...user,
	});
	const [userImage, setUserImage] = useState(user?.avatar);
	const [userRecipes, setUserRecipes] = useState([]);
	const navigate = useNavigate();
	const [edit, setEdit] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e?.target;
		if (name === "name") {
			let arr = value.split(" ");
			let f = arr[0];
			arr.shift();
			let l = arr.join(" ");
			setProfileUser((p) => ({
				...p,
				fname: f,
				lname: l,
			}));
		} else setProfileUser((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e?.preventDefault();
		let editedUser = { username: user.username };
		for (let i in profileUser)
			if (profileUser[i] !== user[i])
				editedUser = { ...editedUser, [i]: profileUser[i] };
		try {
			setIsLoading(true);
			const res = await axiosInstance.put("/api/auth/edit", {
				...editedUser,
			});
			if (res.status === 200) {
				setSnack({
					text: res.data.message,
					bgColor: "var(--green)",
					color: "var(--white)",
				});
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
				updateUser({ ...res.data.user });
				setProfileUser({ ...profileUser, ...res.data.user });
				setUserImage(res.data.user?.avatar);
				setEdit(false);
			} else {
				setSnack({
					text: res.data.message,
					bgColor: "var(--yellow)",
					color: "var(--white)",
				});
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
			}
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response.data.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const getAllRecipes = async () => {
			const res = await getAllRecipesByUsername(user.username);
			setUserRecipes(() => res);
		};
		getAllRecipes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.username]);

	return (
		<main className="profile">
			<section className="profile-head">
				<button
					className="main-cover-back"
					onClick={() => navigate(-1)}
				>
					<ArrowLeftCircle /> Go Back
				</button>
				<button
					className="main-cover-save"
					onClick={(e) => {
						e.preventDefault();
						setEdit((p) => !p);
						if (edit) handleSubmit();
					}}
				>
					{edit ? <Save /> : <Edit />}
				</button>
			</section>
			<div style={{ height: "20vh" }}></div>
			<section className="profile-container">
				<div className="profile-image">
					<img
						src={userImage}
						alt={profileUser.username}
						onError={() => setUserImage(userFallBackImg)}
					/>
				</div>
				<div className="profile-content">
					<form className="profile-form" onSubmit={handleSubmit}>
						<Row>
							<Col lg={100} md={50} sm={100}>
								<Input
									type="text"
									name="name"
									disabled={!edit}
									value={
										profileUser?.fname +
										" " +
										profileUser?.lname
									}
									onChange={handleChange}
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
									onChange={handleChange}
									placeholder="Username"
									title="Username is not editable"
								/>
							</Col>
							<Col lg={50} md={50} sm={100}>
								<Input
									type="text"
									name="bio"
									icon="tips_and_updates"
									disabled={!edit}
									value={profileUser?.bio}
									onChange={handleChange}
									placeholder="Short Bio"
								/>
							</Col>
							<Col lg={50} md={50} sm={100}>
								<Input
									type="email"
									name="email"
									icon="mail"
									disabled={!edit}
									value={profileUser?.email}
									onChange={handleChange}
									placeholder="Email Address"
								/>
							</Col>
							<Col lg={50} md={50} sm={100}>
								<Input
									type="tel"
									name="phone"
									icon="call"
									disabled={!edit}
									value={profileUser?.phone}
									onChange={handleChange}
									placeholder="Phone No."
								/>
							</Col>
							<Col lg={edit ? 50 : 100} md={50} sm={100}>
								<Input
									type="url"
									name="avatar"
									icon="image"
									disabled={!edit}
									value={profileUser?.avatar}
									onChange={handleChange}
									placeholder="Avatar"
								/>
							</Col>
							{edit && (
								<Col lg={50} md={50} sm={100}>
									<Input
										type="password"
										name="password"
										icon="lock"
										disabled={!edit}
										value={profileUser?.password}
										onChange={handleChange}
										placeholder="Password"
									/>
								</Col>
							)}
						</Row>
						<Button className="dispn" type="submit" />
					</form>
				</div>
			</section>
			<section className="profile-recipes">
				{userRecipes.length > 0 && (
					<>
						<div className="profile-recipes-head">
							<h1>
								Recipes by {user.fname} {user.lname}
							</h1>
							<Button
								text={
									<>
										<ExternalLink
											style={{ width: "1.25rem" }}
										/>
										<span style={{ marginLeft: "0.5rem" }}>
											Saved Recipes
										</span>
									</>
								}
								variant="outline"
								link="/saved"
								size="small"
							/>
						</div>
						<Masonry lg={2} md={2} sm={1}>
							{userRecipes.map((res, id) => (
								<MasonryBox key={id}>
									<RecipeFlex {...res} />
								</MasonryBox>
							))}
						</Masonry>
					</>
				)}
			</section>
		</main>
	);
};

export default Profile;

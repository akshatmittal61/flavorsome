import React, { useState } from "react";
import { ArrowLeftCircle, Edit, Save } from "react-feather";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Row, { Col } from "../../layout/Responsive";
import "./profile.css";

const Profile = () => {
	const [profileUser, setProfileUser] = useState({
		fname: "Akshat",
		lname: "Mittal",
		email: "akshatmittal2506@gmail.com",
		username: "akshatmittal61",
		bio: "MERN Stack Developer",
		phone: "9456849466",
		avatar: "https://github.com/akshatmittal61.png",
	});
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
		console.log(profileUser);
		setEdit(false);
	};
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
			<section className="profile-container">
				<div className="profile-image">
					<img src={profileUser.avatar} alt={profileUser.username} />
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
		</main>
	);
};

export default Profile;

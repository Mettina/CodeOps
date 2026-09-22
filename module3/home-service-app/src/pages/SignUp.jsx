import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emailPattern, passwordPattern, phonePattern } from "../utils/validate";

function SignUp() {
	const navigate = useNavigate();
	const location = useLocation();
	const redirectTo = location.state?.redirectTo || "/";
	const [form, setForm] = useState({
		fullName: "",
		email: "",
		phone: "",
		password: "",
	});
	const [error, setError] = useState("");

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
		setError("");
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!emailPattern.test(form.email)) {
			setError("Enter a valid email address.");
			return;
		}

		if (!phonePattern.test(form.phone)) {
			setError(
				"Enter a valid phone number: 09XXXXXXXX, 07XXXXXXXX, or +2519XXXXXXXX."
			);
			return;
		}

		if (!passwordPattern.test(form.password)) {
			setError(
				"Password must be at least 8 characters and include uppercase, lowercase, and a number."
			);
			return;
		}

		const user = {
			fullName: form.fullName.trim(),
			email: form.email.trim().toLowerCase(),
			phone: form.phone.trim(),
			password: form.password,
		};

		try {
			localStorage.setItem("betengaAccount", JSON.stringify(user));
			localStorage.setItem("betengaSession", JSON.stringify(user));

			const savedUser = JSON.parse(localStorage.getItem("betengaAccount"));
			if (savedUser?.email !== user.email || savedUser?.password !== user.password) {
				setError("Your account could not be saved. Please try again.");
				return;
			}
		} catch {
			setError("Your browser could not save the account. Please enable local storage and try again.");
			return;
		}

		window.dispatchEvent(new Event("betengaAuthChange"));
		navigate(redirectTo, { replace: true });
	};

	return (
		<main className="auth-page">
			<section className="auth-card">
				<p className="auth-label">BETENGA ACCOUNT</p>
				<h1>Create your account</h1>
				<p className="auth-intro">
					Create an account before booking a home service.
				</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<label>
						Full Name
						<input
							type="text"
							name="fullName"
							placeholder="Enter your full name"
							value={form.fullName}
							onChange={handleChange}
							required
						/>
					</label>

					<label>
						Email
						<input
							type="email"
							name="email"
							placeholder="example@gmail.com"
							value={form.email}
							onChange={handleChange}
							required
						/>
					</label>

					<label>
						Phone Number
						<input
							type="tel"
							name="phone"
							placeholder="09XXXXXXXX or +2519XXXXXXXX"
							value={form.phone}
							onChange={handleChange}
							required
						/>
					</label>

					<label>
						Password
						<input
							type="password"
							name="password"
							placeholder="At least 8 characters"
							value={form.password}
							onChange={handleChange}
							required
							minLength={8}
						/>
					</label>

					{error && <span className="field-error">{error}</span>}

					<button type="submit" className="book-btn-large">
						Create Account
					</button>
				</form>

				<p className="auth-switch">
					Already have an account? <Link to="/login" state={{ redirectTo }}>Log in</Link>
				</p>
			</section>
		</main>
	);
}

export default SignUp;

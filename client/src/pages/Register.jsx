import { useState } from "react";
import { register as registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
    const [form, setForm] = useState({ email: '', username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await registerUser(form);
        if (res.status === 201) {
            navigate('/login');
        } else {
            console.error('Registration failed:', res.data.message);
        }
    };

    return (
        <div className="register-bg">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-title">Create Account</h2>
                <input
                    className="register-input"
                    placeholder="Email"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="register-input"
                    placeholder="Username"
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                <input
                    className="register-input"
                    type="password"
                    placeholder="Password"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit" className="register-btn">Register</button>
            </form>
        </div>
    );
}

export default Register;
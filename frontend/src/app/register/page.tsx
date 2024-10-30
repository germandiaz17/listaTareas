'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './register.css'

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
        const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
        throw new Error('Error al registrar el usuario');
        }

        setSuccessMessage('Registro exitoso. Redirigiendo al inicio de sesión...');
        setTimeout(() => {
        router.push('/login'); 
        }, 2000);
    } catch (error) {
        setError((error as Error).message);
    }
    };

    return (
    <div>
        <h1>Registrarse</h1>
        <form onSubmit={handleRegister}>
        <div>
            <label>Usuario:</label>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div>
        <div>
            <label>Contraseña:</label>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <button type="submit">Registrarse</button>
        </form>
        {error && <p>{error}</p>}
        {successMessage && <p className='success'>{successMessage}</p>}
    </div>
    );
};

export default RegisterPage;

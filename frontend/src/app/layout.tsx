import React from 'react';
import './globals.css';

export const metadata = {
  title: 'App de Tareas',
  description: 'Aplicación para gestionar tus tareas',
};


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body>
        <nav>
          <a href="/">Lista de Tareas</a> | 
          <a href="/login"> Iniciar Sesión</a> |
          <a href="/register"> Registrarse</a>
        </nav>
        {children}
        
        <div className='footer'>
        <div className="footer-content">
          <p>&copy; 2024 App de listado de tareas. Desarrollado por German Diaz.</p>
          <div className="social-links">
            <a href="https://portfolio-german-diaz.vercel.app/" target="_blank">mi portafolio</a>
            <a href="https://www.linkedin.com/in/german-rodrigo-diaz-olarte-08b5631a8/" target="_blank">Linkedin</a>
            <a href="https://github.com/germandiaz17" target="_blank">github</a>
          </div>
        </div>
      </div>
      </body>

    </html>
  );
};

export default RootLayout;

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './taskList.css';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const HomePage = () => {
  const router = useRouter(); 
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pendiente' });
  const [error, setError] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('todos'); 
  const [accessToken, setAccessToken] = useState<string | null>(null); 

  // Verificar si hay token en el cliente
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); 
    setAccessToken(token); 

    if (!token) {
      router.push('/login'); 
    }
  }, [router]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      if (!accessToken) return; // No hacer fetch si no hay token

      try {
        const response = await fetch('http://localhost:3001/tasks', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (!response.ok) throw new Error('Error al obtener las tareas');

        const data = await response.json(); 
        setTasks(data);
      } catch (error) {
        setError('No se pudieron cargar las tareas.');
      }
    };

    fetchTasks(); // Llamar a la función para obtener tareas
  }, [accessToken]);

  // Función para crear o actualizar una tarea
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTaskId) {
      // Actualizar una tarea existente
      try {
        const response = await fetch(`http://localhost:3001/tasks/${editingTaskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) throw new Error('Error al actualizar la tarea');

        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task.id === editingTaskId ? updatedTask : task)));
        setNewTask({ title: '', description: '', status: 'pendiente' });
        setEditingTaskId(null);
      } catch (error) {
        setError('No se pudo actualizar la tarea.');
      }
    } else {
      // Crear nueva tarea
      try {
        const response = await fetch('http://localhost:3001/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) throw new Error('Error al crear la tarea');

        const createdTask = await response.json();
        setTasks([...tasks, createdTask]);
        setNewTask({ title: '', description: '', status: 'pendiente' });
      } catch (error) {
        setError('No se pudo crear la tarea.');
      }
    }
  };

  // Cargar valores en el formulario para editar
  const handleEditTask = (task: Task) => {
    setNewTask({ title: task.title, description: task.description, status: task.status });
    setEditingTaskId(task.id);
  };

  // Eliminar tareas
  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Error al eliminar la tarea');

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError('No se pudo eliminar la tarea.');
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    router.push('/login'); 
  };

  // Manejar el cambio de filtro
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  // Filtrar las tareas según el estado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'todos') return true; 
    return task.status === filter; 
  });

  return (
    <div className='tasks-container'>
      <h1>Listado de Tareas</h1>
      <button onClick={handleLogout} className='logout-button'>Cerrar Sesión</button>
      {error && <p className='error-message'>{error}</p>}

      {/* Selector de filtro */}
      <div className='form-group'>
        <label htmlFor="filter">Filtrar por estado:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="todos">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      {/* Formulario para crear y editar */}
      <form onSubmit={handleSubmit} className='task-form'>
        <div className='form-group'>
          <h2>Crear o editar tareas</h2>
          <input
            type="text"
            placeholder="Título"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type="text"
            placeholder="Descripción"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
          />
        </div>
        <div className='form-group'>
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
        <button type="submit" className='submit-button'>{editingTaskId ? 'Actualizar Tarea' : 'Crear Tarea'}</button>
      </form>

      {/* Listado de tareas filtradas */}
      <ul className='task-list'>
        {filteredTasks.map((task) => (
          <li key={task.id} className='task-item'>
            <h3>Titulo: {task.title}</h3>
            <p>Descripcion: {task.description}</p>
            <span>Estado: {task.status}</span>
            <button onClick={() => handleEditTask(task)} className='edit-button'>Editar</button>
            <button onClick={() => handleDeleteTask(task.id)} className='delete-button'>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

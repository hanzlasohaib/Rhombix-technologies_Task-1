import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTheme } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const { isDarkMode, toggleTheme } = useTheme();

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  // Filter todos based on current filter
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
    }`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${
          isDarkMode ? 'bg-purple-600' : 'bg-purple-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 ${
          isDarkMode ? 'bg-pink-600' : 'bg-pink-300'
        }`}></div>
        <div className={`absolute top-40 left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 ${
          isDarkMode ? 'bg-indigo-600' : 'bg-indigo-300'
        }`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Theme Toggle */}
          <div className="text-center mb-12 animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <div></div> {/* Spacer */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-white/90 text-gray-700 hover:bg-white shadow-lg'
                }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Todo List
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Stay organized and boost your productivity with our beautiful, interactive todo list
            </p>
          </div>

          {/* Todo Form */}
          <TodoForm onAddTodo={addTodo} />

          {/* Stats and Filter Buttons */}
          {todos.length > 0 && (
            <div className="mb-8 animate-fadeIn">
              {/* Stats Cards */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className={`backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/90 border-gray-600 text-gray-200' 
                    : 'bg-white/90 border-gray-200 text-gray-800'
                }`}>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total: </span>
                  <span className="font-semibold">{todos.length}</span>
                </div>
                <div className={`backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/90 border-gray-600 text-gray-200' 
                    : 'bg-white/90 border-gray-200 text-gray-800'
                }`}>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active: </span>
                  <span className="font-semibold text-purple-400">{activeCount}</span>
                </div>
                <div className={`backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/90 border-gray-600 text-gray-200' 
                    : 'bg-white/90 border-gray-200 text-gray-800'
                }`}>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed: </span>
                  <span className="font-semibold text-green-400">{completedCount}</span>
                </div>
                {completedCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 transform hover:scale-105"
                  >
                    Clear Completed
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                    filter === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : isDarkMode
                        ? 'bg-gray-800/90 text-gray-200 hover:bg-gray-700 border border-gray-600'
                        : 'bg-white/90 text-gray-700 hover:bg-white border border-gray-200'
                  }`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                    filter === 'active'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : isDarkMode
                        ? 'bg-gray-800/90 text-gray-200 hover:bg-gray-700 border border-gray-600'
                        : 'bg-white/90 text-gray-700 hover:bg-white border border-gray-200'
                  }`}
                >
                  Active Tasks
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                    filter === 'completed'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : isDarkMode
                        ? 'bg-gray-800/90 text-gray-200 hover:bg-gray-700 border border-gray-600'
                        : 'bg-white/90 text-gray-700 hover:bg-white border border-gray-200'
                  }`}
                >
                  Completed Tasks
                </button>
              </div>
            </div>
          )}

          {/* Todo List */}
          <div className={`backdrop-blur-sm rounded-2xl shadow-2xl border p-8 animate-fadeIn transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/70 border-gray-600' 
              : 'bg-white/70 border-white/30'
          }`}>
            <TodoList
              todos={getFilteredTodos()}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              filter={filter}
            />
          </div>

          {/* Footer */}
          <div className={`text-center mt-12 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } animate-fadeIn`}>
            <p>Copyright &copy;2025 | All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

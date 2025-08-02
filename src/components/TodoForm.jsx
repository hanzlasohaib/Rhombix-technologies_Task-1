import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const TodoForm = ({ onAddTodo }) => {
  const [task, setTask] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTodo({
        id: Date.now(),
        text: task.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      });
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse`}></div>
        <div className="relative flex items-center">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What needs to be done?"
            className={`w-full px-6 py-4 text-lg backdrop-blur-sm border-2 rounded-lg shadow-lg transition-all duration-300 ease-out ${
              isDarkMode 
                ? 'bg-gray-800/95 text-gray-100 placeholder-gray-400' 
                : 'bg-white/95 text-gray-800 placeholder-gray-500'
            } ${
              isFocused 
                ? 'border-purple-500 shadow-purple-500/25 scale-105' 
                : isDarkMode
                  ? 'border-gray-600 hover:border-purple-400'
                  : 'border-gray-200 hover:border-purple-300'
            } focus:outline-none focus:ring-4 focus:ring-purple-500/20`}
          />
          <button
            type="submit"
            disabled={!task.trim()}
            className={`ml-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              task.trim() ? 'animate-pulse' : ''
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm; 
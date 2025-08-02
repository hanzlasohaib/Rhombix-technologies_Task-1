import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isHovered, setIsHovered] = useState(false);
  const editInputRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    // Add a small delay for the animation
    setTimeout(() => {
      onDelete(todo.id);
    }, 150);
  };

  return (
    <div
      className={`group relative backdrop-blur-sm rounded-xl shadow-lg border p-6 mb-4 transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl ${
        isDarkMode 
          ? 'bg-gray-800/90 border-gray-600' 
          : 'bg-white/90 border-gray-200'
      } ${
        todo.completed ? 'opacity-75' : ''
      } animate-slideIn`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${todo.id % 100}ms`
      }}
    >
      {/* Gradient background effect */}
      <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20' 
          : 'bg-gradient-to-r from-purple-50 to-pink-50'
      } ${
        isHovered ? 'opacity-100' : ''
      }`}></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          {/* Checkbox with proper styling */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 transition-all duration-300 ease-out transform hover:scale-110 flex items-center justify-center ${
              todo.completed
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-600 shadow-lg'
                : isDarkMode
                  ? 'bg-gray-700 border-gray-400 hover:border-purple-400'
                  : 'bg-white border-gray-800 hover:border-purple-500'
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Todo text */}
          <div className="ml-4 flex-1 min-w-0">
            {isEditing ? (
              <input
                ref={editInputRef}
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyPress}
                className={`w-full px-3 py-2 text-lg bg-transparent border-b-2 border-purple-500 focus:outline-none focus:border-purple-600 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}
              />
            ) : (
              <p
                className={`text-lg font-medium transition-all duration-300 ${
                  todo.completed
                    ? isDarkMode ? 'line-through text-gray-500' : 'line-through text-gray-500'
                    : isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </p>
            )}
            
            {/* Timestamp */}
            <p className={`text-sm mt-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {new Date(todo.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`flex items-center space-x-2 ml-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {!todo.completed && (
            <button
              onClick={() => setIsEditing(true)}
              className={`p-2 transition-colors duration-200 transform hover:scale-110 ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-purple-400' 
                  : 'text-gray-500 hover:text-purple-600'
              }`}
              title="Edit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          
          <button
            onClick={handleDelete}
            className={`p-2 transition-colors duration-200 transform hover:scale-110 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-red-400' 
                : 'text-gray-500 hover:text-red-600'
            }`}
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Completion indicator */}
      {todo.completed && (
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default TodoItem; 
import TodoItem from './TodoItem';
import { useTheme } from '../contexts/ThemeContext';

const TodoList = ({ todos, onToggle, onDelete, onEdit, filter }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);
  const { isDarkMode } = useTheme();

  // Show appropriate empty state based on filter
  if (todos.length === 0) {
    let emptyMessage = "No tasks yet";
    let emptyDescription = "Add your first task to get started!";
    
    if (filter === 'active') {
      emptyMessage = "No active tasks";
      emptyDescription = "All your tasks are completed!";
    } else if (filter === 'completed') {
      emptyMessage = "No completed tasks";
      emptyDescription = "Complete some tasks to see them here!";
    }

    return (
      <div className="text-center py-12 animate-fadeIn">
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
          isDarkMode 
            ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50' 
            : 'bg-gradient-to-br from-purple-100 to-pink-100'
        }`}>
          <svg className={`w-12 h-12 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>{emptyMessage}</h3>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{emptyDescription}</p>
      </div>
    );
  }

  // For filtered views, show all todos in a single list
  if (filter === 'active' || filter === 'completed') {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              style={{
                animationDelay: `${index * 100}ms`
              }}
              className="animate-slideIn"
            >
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>

        {/* Progress Bar for filtered views */}
        <div className={`mt-8 p-4 backdrop-blur-sm rounded-xl shadow-lg border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {filter === 'active' ? 'Active Tasks' : 'Completed Tasks'}
            </span>
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {todos.length} {filter === 'active' ? 'active' : 'completed'} task{todos.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // For "all" filter, show separated active and completed sections
  return (
    <div className="space-y-6">
      {/* Active Todos */}
      {activeTodos.length > 0 && (
        <div className="space-y-4">
          <h2 className={`text-lg font-semibold flex items-center ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
            Active Tasks ({activeTodos.length})
          </h2>
          <div className="space-y-3">
            {activeTodos.map((todo, index) => (
              <div
                key={todo.id}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                className="animate-slideIn"
              >
                <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Todos */}
      {completedTodos.length > 0 && (
        <div className="space-y-4">
          <h2 className={`text-lg font-semibold flex items-center ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Completed ({completedTodos.length})
          </h2>
          <div className="space-y-3 opacity-75">
            {completedTodos.map((todo, index) => (
              <div
                key={todo.id}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
                className="animate-slideIn"
              >
                <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {todos.length > 0 && (
        <div className={`mt-8 p-4 backdrop-blur-sm rounded-xl shadow-lg border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600' 
            : 'bg-white/90 border-gray-200'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>Progress</span>
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {completedTodos.length} of {todos.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${todos.length > 0 ? (completedTodos.length / todos.length) * 100 : 0}%`
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList; 
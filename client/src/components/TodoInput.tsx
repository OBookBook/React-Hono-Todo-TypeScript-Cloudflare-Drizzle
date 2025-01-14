const TodoInput = () => {
  return (
    <div className="flex items-center mb-4">
      <input
        className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        placeholder="Add a new task"
        type="text"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg">
        Add
      </button>
    </div>
  );
};

export default TodoInput;

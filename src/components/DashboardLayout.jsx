export default function DashboardLayout({children  }) {
  return (
    <div className="h-screen flex text-sm text-gray-700 dark:text-white dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-4 space-y-6">
        <div className="text-blue-500 text-xl font-bold">Divion</div>
        <nav className="flex flex-col space-y-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-gray-700">
            🏠
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-gray-700">
            📄
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-blue-100 dark:hover:bg-gray-700">
            ⚙️
          </button>
        </nav>
      </aside>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <div className="text-lg font-semibold">Dashboard</div>
          <div className="flex items-center space-x-3">
            <span className="text-sm">Welcome, Brecka</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {children}
        </main>
      </div>
    </div>
  );
}

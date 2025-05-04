'use client';

export default function EmployeeStatusCard({ name, license, background }) {
  return (
    <div className="flex items-center gap-4 border rounded-md px-4 py-2">
      <span className="font-medium w-24">{name}</span>
      <span className={license ? "text-green-600" : "text-red-600"}>
        {license ? "✅ License" : "❌ License"}
      </span>
      <span className={background ? "text-green-600" : "text-red-600"}>
        {background ? "✅ Background" : "❌ Background"}
      </span>
    </div>
  );
}

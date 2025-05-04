'use client';

import ComplianceMetricCard from "@/components/ComplianceMetricCard";
import EmployeeStatusCard from "@/components/EmployeeStatusCard";

const employees = [
  { name: "Jordan", license: true, background: true },
  { name: "Alex", license: false, background: true },
  { name: "Taylor", license: true, background: true },
  { name: "Sam", license: false, background: false },
];

export default function HRPage() {
  const total = employees.length;
  const licenseComplete = employees.filter(e => e.license).length;
  const backgroundComplete = employees.filter(e => e.background).length;

  return (
<div className="min-h-screen bg-muted/40 text-foreground p-6 space-y-6">
<h1 className="text-2xl font-bold">HR Compliance Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ComplianceMetricCard
          title="Total Employees"
          value={total}
          compliant={true}
        />
        <ComplianceMetricCard
          title="Driver's Licenses"
          value={`${licenseComplete} / ${total}`}
          compliant={licenseComplete === total}
        />
        <ComplianceMetricCard
          title="Background Checks"
          value={`${backgroundComplete} / ${total}`}
          compliant={backgroundComplete === total}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Employee Status</h2>
        <div className="space-y-2">
          {employees.map((e, i) => (
            <EmployeeStatusCard
              key={i}
              name={e.name}
              license={e.license}
              background={e.background}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

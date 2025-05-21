'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/Table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/Dropdown-menu';

import { MoreVertical, Trash2 } from 'lucide-react';

const documentTypes = [
  'Resume',
  'Transcript (Education)',
  'Criminal Background Clearance (PA State Police)',
  'FBI Background Check',
  'Child Abuse History Clearance',
  'Driver’s License Info',
  'Vehicle Documentation',
  'Specialized Qualification Documentation',
  'Miscellaneous Documents',
];

export default function DocumentUploadTable({
  files = [],
  onDelete,
  onDocTypeChange,
  onEmployeeAssign,
  employees = [],
}) {
  return (
    <Table className="w-full text-sm">
      <TableHead>
        <TableRow className="bg-muted">
          <TableHeader className="p-3 w-1/5">File Name</TableHeader>
          <TableHeader className="p-3 w-1/5">Matched Employee</TableHeader>
          <TableHeader className="p-3 w-1/5">Document Type</TableHeader>
          <TableHeader className="p-3 w-1/5">Status</TableHeader>
          <TableHeader className="p-3 w-1/5 text-right">Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {files.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
              No files uploaded yet.
            </TableCell>
          </TableRow>
        ) : (
          files.map((file, index) => (
            <TableRow key={index} className="border-t">
              {/* File Name */}
              <TableCell className="p-3">{file.fileName}</TableCell>

              {/* Matched Employee / Dropdown */}
              <TableCell className="p-3">
                {file.matchedEmployee ? (
                  file.matchedEmployee.name
                ) : (
                  <select
                    className="w-full border rounded px-2 py-1"
                    defaultValue=""
                    onChange={(e) => onEmployeeAssign(index, e.target.value)}
                  >
                    <option value="" disabled>Assign...</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                )}
              </TableCell>

              {/* Document Type Dropdown */}
              <TableCell className="p-3">
                <select
                  value={file.docType}
                  onChange={(e) => onDocTypeChange(index, e.target.value)}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select Type</option>
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </TableCell>

              {/* Status */}
              <TableCell className="p-3 font-medium text-sm">
                <span className={
                  file.status === 'Matched'
                    ? 'text-green-600'
                    : file.status === 'Manually Assigned'
                    ? 'text-blue-600'
                    : 'text-orange-500'
                }>
                  {file.status}
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="p-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onDelete?.(index)}
                      className="text-red-600 flex gap-2 items-center"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

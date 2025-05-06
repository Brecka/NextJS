'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { MoreVertical, Trash2 } from 'lucide-react';

export default function DocumentUploadTable({ files = [], onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Document Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              No files uploaded yet.
            </TableCell>
          </TableRow>
        ) : (
          files.map((file, index) => (
            <TableRow key={index}>
              <TableCell>{file.fileName}</TableCell>
              <TableCell>{file.matchedEmployee?.name || '—'}</TableCell>
              <TableCell>{file.docType || '—'}</TableCell>
              <TableCell className={file.status.includes('Matched') ? 'text-green-600' : 'text-red-600'}>
                {file.status}
              </TableCell>
              <TableCell className="text-right">
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

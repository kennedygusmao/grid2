"use client"

import { Save, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GridToolbarProps {
  title: string;
  hasChanges: boolean;
  onSave: () => void;
  onAdd: () => void;
}

export function GridToolbar({ title, hasChanges, onSave, onAdd }: GridToolbarProps) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex justify-end gap-2">
        <Button
          onClick={onSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!hasChanges}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button
          onClick={onAdd}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Row
        </Button>
      </div>
    </div>
  );
}
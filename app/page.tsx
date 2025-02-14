"use client"

import { ReusableDataGrid } from '@/components/data-grid/reusable-data-grid';
import { MUIProvider } from '@/components/providers/mui-provider';
import User from '@/components/user/user';
export default function Home() {
  const handleSave = (updatedRows: any[]) => {
    console.log('Saved rows:', updatedRows);
  };

  return (
    <MUIProvider>
      <main className="min-h-screen bg-black p-8">
        <div className="container mx-auto h-[800px]">
          <div className="bg-[#1e1e1e] rounded-lg shadow-lg p-6 h-full">
            <ReusableDataGrid
              title="Data Grid Premium Demo"
              onSave={handleSave}
            />
            <User />
          </div>
        </div>
      </main>
    </MUIProvider>
  );
}
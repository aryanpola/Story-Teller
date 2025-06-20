import React from 'react';
import SimpleStoryCreator from '../components/SimpleStoryCreator';

const CreateStoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 py-8 px-4">
      <SimpleStoryCreator />
    </div>
  );
};

export default CreateStoryPage;

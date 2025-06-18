// Mock models provider for development mode
const createMockDocument = (data) => ({
  ...data,
  _id: 'mock-id-' + Date.now(),
  save: () => Promise.resolve(data)
});

export const getMockModel = () => ({
  find: () => ({ 
    sort: () => ({ 
      skip: () => ({
        limit: () => Promise.resolve([])
      }),
      limit: () => Promise.resolve([]),
      exec: () => Promise.resolve([])
    }),
    countDocuments: () => Promise.resolve(0),
    exec: () => Promise.resolve([])
  }),
  findOne: () => Promise.resolve(null),
  findById: () => Promise.resolve(null),
  findByIdAndUpdate: () => Promise.resolve(null),
  findByIdAndDelete: () => Promise.resolve(null),
  create: (data) => Promise.resolve(createMockDocument(data))
});

const mockWatch = jest.fn();
const mockTrigger = jest.fn();
const mockSetValue = jest.fn();
const mockGetValues = jest.fn();
const mockSetError = jest.fn();
const mockIsDirty = jest.fn();
const mockReset = jest.fn();
const mockUseVehicleNumber = jest.fn();
const mockIsMobileOnly = jest.fn();

jest.mock('@sravni/cosago-react-library/lib/hooks', () => ({
  ...jest.requireActual('@sravni/cosago-react-library/lib/hooks'),
  useFormContext: () => ({
    watch: mockWatch,
    trigger: mockTrigger,
    setValue: mockSetValue,
    getValues: mockGetValues,
    reset: mockReset,
    resetField: mockReset,
    setError: mockSetError,
    formState: {
      get isDirty() {
        return mockIsDirty();
      },
    },
    getFieldState: () => ({
      get isDirty() {
        return mockIsDirty();
      },
    }),
  }),
  useVehicleNumber: () => mockUseVehicleNumber(),
  useIsMobileOnly: () => mockIsMobileOnly(),
}));

export {
  mockWatch,
  mockTrigger,
  mockSetValue,
  mockIsDirty,
  mockReset,
  mockSetError,
  mockUseVehicleNumber,
  mockIsMobileOnly,
};

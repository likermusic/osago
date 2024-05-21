import { toggleSummaryAccordion } from '../toggleSummaryAccordion';

describe('WHEN "toggleSummaryAccordion" is called', () => {
  const getElementById = jest.fn();
  Object.defineProperty(document, 'getElementById', {
    value: getElementById,
  });

  it('AND accordion toggler has found, MUST click on it', () => {
    const click = jest.fn();

    getElementById.mockReturnValue({
      firstElementChild: {
        firstElementChild: {
          click,
        },
      },
    });

    toggleSummaryAccordion();

    expect(click).toHaveBeenCalled();
  });

  it('AND accordion toggler has not found, MUST exit correctly', () => {
    getElementById.mockReturnValue({});

    let error: Nullable<Error> = null;
    try {
      toggleSummaryAccordion();
    } catch (e) {
      error = e;
    }

    expect(error).toBeNull();
  });
});

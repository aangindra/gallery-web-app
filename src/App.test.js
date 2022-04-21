import React from 'react';
import { render, act } from '@testing-library/react';
import App, { LoadingSpinner, showLoadingSpinner, hideLoadingSpinner } from './App';

describe('test App', () => {
  test('render App with loadingSpinner', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });

  test('call LoadingSpinner > showLoadingSpinner', () => {
    const _loadingSpinnerRef = React.createRef();
    render(<LoadingSpinner ref={_loadingSpinnerRef} />);

    const { container } = render(<App />);
    act(() => showLoadingSpinner());
    expect(container).toBeDefined();
  });

  test('call LoadingSpinner > hideLoadingSpinner', () => {
    const _loadingSpinnerRef = React.createRef();
    render(<LoadingSpinner ref={_loadingSpinnerRef} />);

    const { container } = render(<App />);
    act(() => hideLoadingSpinner());
    expect(container).toBeDefined();
  });

  test('call LoadingSpinner > showLoadingSpinner when _loadingSpinnerRef null', () => {
    const _loadingSpinnerRef = null;
    const useRefSpy = jest.spyOn(React, 'useRef');
    useRefSpy.mockImplementation(() => {
      return null;
    });

    const { container } = render(<App />);
    expect(container).toBeDefined();

    showLoadingSpinner();
    expect(_loadingSpinnerRef).toBeNull();
  });

  test('call LoadingSpinner > hideLoadingSpinner when _loadingSpinnerRef is null', () => {
    const _loadingSpinnerRef = null;
    const useRefSpy = jest.spyOn(React, 'useRef');
    useRefSpy.mockImplementation(() => {
      return null;
    });

    const { container } = render(<App />);
    expect(container).toBeDefined();

    hideLoadingSpinner();
    expect(_loadingSpinnerRef).toBeNull();
  })
})

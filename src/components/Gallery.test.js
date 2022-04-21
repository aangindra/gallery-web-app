import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Gallery from './Gallery';

describe('test Gallery', () => {
  test('render Gallery with loadingSpinner', () => {
    const { container } = render(<Gallery />);

    fireEvent.change(screen.queryByTestId("search-image"), {
      target: {
        value: 'macbook'
      }
    });

    expect(container).toBeDefined();
  });
})

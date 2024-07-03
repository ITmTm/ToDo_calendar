import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Calendar from './Calendar';

test('renders calendar days', () => {
  render(
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
  const days = screen.getAllByRole('button');
  expect(days).toHaveLength(31);
});

test('opens modal on day click', () => {
  render(
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
  const day = screen.getByText('1');
  fireEvent.click(day);
  const modal = screen.getByText(/Tasks for/i);
  expect(modal).toBeInTheDocument();
});
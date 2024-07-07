import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/app/App';

test('renders calendar and task modal', () => {
  render(<App />);
  const dayElement = screen.getByText(/Monday/i);
  fireEvent.click(dayElement);
  const modalElement = screen.getByText(/Tasks for/i);
  expect(modalElement).toBeInTheDocument();
});

test('switch profile', () => {
  render(<App />);
  const profileSelect = screen.getByLabelText(/Profile/i);
  fireEvent.change(profileSelect, { target: { value: 'Profile_2' } });
  const selectedProfile = screen.getByText(/Profile_2/i);
  expect(selectedProfile).toBeInTheDocument();
});

test('add task', () => {
  render(<App />);
  const addButton = screen.getByText(/Add Task/i);
  fireEvent.click(addButton);
  const taskInput = screen.getByLabelText(/New Task/i);
  fireEvent.change(taskInput, { target: { value: 'New Test Task' } });
  const saveButton = screen.getByText(/Add Task/i);
  fireEvent.click(saveButton);
  const newTask = screen.getByText(/New Test Task/i);
  expect(newTask).toBeInTheDocument();
})

// export {};
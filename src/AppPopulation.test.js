import { render, screen, fireEvent } from '@testing-library/react';
import AppPopulation from './AppPopulation';

function showTable() {
  const buttonElement = screen.getByRole("button", { name: /Table/i });
  fireEvent.click(buttonElement);
};

function showGraph() {
  const buttonElement = screen.getByRole("button", { name: /Graph/i });
  fireEvent.click(buttonElement);
};

describe('AppPopulation', () => {

  it('renders div element', () => {
    render(<AppPopulation />);
    const divElement = screen.getByText(/World's population/i);
    expect(divElement).toBeInTheDocument();
  });

  it('renders table button', () => {
    render(<AppPopulation />);
    const buttonElement = screen.getByTestId("button-table");
    expect(buttonElement).toBeInTheDocument();
  });
  
  it('renders graph button', () => {
    render(<AppPopulation />);
    const buttonElement = screen.getByTestId("button-graph");
    expect(buttonElement).toBeInTheDocument();
  });

  it('should show the table', () => {
    render(<AppPopulation />);

    showTable();

    const tableElement = screen.getByTestId("table-element");
    expect(tableElement).toBeInTheDocument();
  });
  
  it('should show the graph', () => {
    render(<AppPopulation />);

    showGraph();

    const tableElement = screen.getByTestId("graph-element");
    expect(tableElement).toBeInTheDocument();
  });

});

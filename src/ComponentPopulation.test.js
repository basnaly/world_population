import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import ComponentPopulation from './ComponentPopulation';
  
function showNextPage() {
    const buttonElement = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(buttonElement);
};

function sortCountries() {
    const buttonElement = screen.getByTestId("sort-country");
    fireEvent.click(buttonElement);
};

function sortPopulation() {
    const buttonElement = screen.getByTestId("sort-population");
    fireEvent.click(buttonElement);
};

const MockData = [
        { "country": "Afghanistan", "population": 37172386 },
        { "country": "Albania", "population": 2866376 },
        { "country": "Algeria", "population": 42228429 },
        { "country": "American Samoa", "population": 55465 },
        { "country": "Andorra", "population": 77006 },
        { "country": "Angola", "population": 30809762 },
        { "country": "Anguilla", "population": 15094 },
        { "country": "Antarctica", "population": 1106 },
        { "country": "Antigua and Barbuda", "population": 96286 },
        { "country": "Argentina", "population": 44494502 },
        { "country": "Armenia", "population": 2951776 },
        { "country": "Aruba", "population": 105845 },
        { "country": "Australia", "population": 24982688 },
        { "country": "Austria", "population": 8840521 },
]

const ComponentPopulationMock = () => {
    const [mockData, setMockData] = useState(MockData);
    return (
        <ComponentPopulation data={ mockData } setData={ setMockData } />
    )
}

describe('Component Population', () => {
    it('renders table with 12 rows', () => {
      render(<ComponentPopulationMock />);
      const trElement = screen.getAllByTestId("tr-element");
      expect(trElement.length).toEqual(12);
    });

    it('previous button should be disbled', () => {
        render(<ComponentPopulationMock />);
        const tableElement = screen.getByTestId("previous-button");
        expect(tableElement).toBeDisabled();
    });

    it('next button should be enabled', () => {
        render(<ComponentPopulationMock />);
        const tableElement = screen.getByTestId("next-button");
        expect(tableElement).not.toBeDisabled();
    });

    it('on the page 2 previous button should be enabled', () => {
        render(<ComponentPopulationMock />);
    
        showNextPage();
    
        const tableElement = screen.getByTestId("previous-button");
        expect(tableElement).not.toBeDisabled();
    });

    it('on the page 2 next button should be disabled', () => {
        render(<ComponentPopulationMock />);
    
        showNextPage();
    
        const tableElement = screen.getByTestId("next-button");
        expect(tableElement).toBeDisabled();
    });

    it('renders sort country button', () => {
        render(<ComponentPopulationMock />);
        const buttonElement = screen.getByTestId("sort-country");
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders sort population button', () => {
        render(<ComponentPopulationMock />);
        const buttonElement = screen.getByTestId("sort-population");
        expect(buttonElement).toBeInTheDocument();
    });

    it('sort countries', () => {
        render(<ComponentPopulationMock />);
    
        sortCountries();
        sortCountries();
    
        const textElement = screen.getByText("Austria");
        expect(textElement).toBeInTheDocument();
    });

    it('sort population', () => {
        render(<ComponentPopulationMock />);
    
        sortPopulation();
    
        const numberElement = screen.getByText('8,840,521');
        expect(numberElement).toBeInTheDocument();
    });

});
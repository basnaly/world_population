import React, { useState } from "react";
import { Button } from 'react-bootstrap';

const styles = {
    div: {
        overflow: 'auto',
        marginTop: "20px",
    },
    table: {
        backgroundColor: '#bbb9'
    },
    header: {
        position: 'sticky',
        top: 0,
        background: 'lightblue',
    },
    td: {
        fontSize: "18px",
        textAlign: 'center',
        padding: '2px 10px',
        color: "black",
        border: '1px solid gray',    
    },
    th: {
        fontSize: "18px",
        textAlign: 'center',
        padding: '2px 10px',
        color: "black",
        border: '1px solid gray',
        position: 'relative',
        height: '43px',
    }, 
    span: {
        color: 'crimson',
        padding: '4px 7px',
        border: '1px solid crimson',
        borderRadius: '5px',
        backgroundColor: 'lightgray',
        position: 'absolute',
        right: "2px",
        top: '3px',
        cursor: 'pointer',
    },
    buttons: {
        margin: "20px",
    
    }     
};

const format = (population) => {
    let formatedPopulation = ('' + population).split('').reverse().map((el, i) => 
        (i % 3 === 0 && i > 0) ? el + ',' : el).reverse().join('');
    return formatedPopulation;
}

const PAGE_SIZE = 12;

const ComponentPopulation = (props) => {

    const [sortDirectionCountry, setSortDirectionCountry] = useState(true);
    const [sortDirectionPopulation, setSortDirectionPopulation] = useState(true);
    const [start, setStart] = useState(0);

    const sortCountry = () => {

        let sortedData = [...props.data].sort((a, b) => {
            if (sortDirectionCountry){
                return a.country.localeCompare(b.country)
            } else {
                return b.country.localeCompare(a.country)
            }
        })

        setStart(0);

        setSortDirectionCountry(prev => !prev )
        props.setData(sortedData)
    }

    const sortPopulation = () => {

        let sortedData = [...props.data].sort((a, b) => {
            if (sortDirectionPopulation){
                return a.population - b.population
            } else {
                return b.population - a.population
            }
        })

        setStart(0);

        setSortDirectionPopulation(prev => !prev )
        props.setData(sortedData);
    }

    return(
        <div className="d-flex flex-column align-items-center">
            <table data-testid="table-element"
                    style={ styles.tab }>
                <thead style={ styles.header }>
                    <tr className="align-items-center">
                        <th style={ styles.th }>
                            NN
                        </th>
                        <th style={ styles.th } >
                            <span className="mx-5">Country</span> 
                            <span style={ styles.span }
                                    data-testid="sort-country"
                                    onClick={ sortCountry } >
                                ↑↓
                            </span>
                        </th>
                        <th style={ styles.th }>
                            <span className="mx-5">Population</span>
                            <span style={ styles.span }
                                    data-testid="sort-population"
                                    onClick={ sortPopulation } >
                                ↑↓
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {props.data.slice(start, (start + PAGE_SIZE)).map((el, i) => 
                        <tr data-testid="tr-element"
                            key={ el.country }>
                            <td style={ styles.td }>
                                {  start + i + 1 }
                            </td>
                            <td style={ styles.td }>
                                { el.country }
                            </td>
                            <td style={ styles.td }>
                                { format(el.population) }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div style={ styles.buttons }>
                <Button onClick={ () => setStart(prev => prev - PAGE_SIZE) }
                    variant={ 'warning' } size={"sm"}
                    className="mx-2"
                    disabled={start === 0} 
                    data-testid="previous-button">
                        Previous
                </Button>
                
                <Button onClick={ () => setStart(prev => prev + PAGE_SIZE) }
                    variant={ 'warning' } size={"sm"}
                    className="mx-2"
                    disabled={start + PAGE_SIZE > props.data.length}
                    data-testid="next-button">
                        Next
                </Button> 
            </div>
        </div>
    )
}

export default ComponentPopulation;
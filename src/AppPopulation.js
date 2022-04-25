import React, {useEffect, useState} from "react";
import axios from "axios";

import { Button } from 'react-bootstrap';
import ComponentPopulation from "./ComponentPopulation";
import ChartPopulation from "./ChartPopulation";

const styles = {
    parent: {
        backgroundImage: 'url("/population.jpeg")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    div: {
        fontSize: '30px',
        margin: "10px",    
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
        fontSize: "22px",
        textAlign: 'center',
        padding: '2px 10px',
        color: "yellow",
        border: '1px solid cyan',   
    },
    th: {
        fontSize: "20px",
        textAlign: 'center',
        padding: '2px 10px',
        color: "crimson",
        border: '1px solid cyan',
        position: 'relative',
        height: '43px',
    }, 
    divDisplay: {
        fontSize: '18px',
        marginBottom: "20px",
    }     
};

const requestURL = 'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-population.json';

const Table = 0;
const Graph = 1;

const AppPopulation = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [clicked, setClicked] = useState(0);

    const requestPopulation = () => {
        setLoading(true);

        axios.get(requestURL)
            .then(result => {
                setData(result.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        requestPopulation()
    }, [])

    return(
        <div className="d-flex flex-column align-items-center"
            style={ styles.parent }>
            <div style={ styles.div }>
                World's population
            </div>
            <div className="d-flex align-items-center"
                    style={ styles.divDisplay }>
                <div >Select</div>
                <Button data-testid="button-table"
                        className="mx-1"
                        onClick={ () => setClicked(Table) }
                        variant={ 'warning' } size={ "sm" }>
                    Table
                </Button>
                <div>or</div>
                <Button data-testid="button-graph"
                        className="mx-1"
                        onClick={ () => setClicked(Graph) }
                        variant={ 'warning' } size={ "sm" }>
                    Graph
                </Button>
            </div>
            {clicked === Table ?  
            <ComponentPopulation data={ data } setData={ setData } />
            : <ChartPopulation data={ data }/>
            }
        </div>
    )
}

export default AppPopulation
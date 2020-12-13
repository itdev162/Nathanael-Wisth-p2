import React from 'react';

const Car = props => {
    const {car} = props;

    return(
        <div>
            <h1>{car.model}</h1>
            <p>{car.year + " " + car.make + " " + car.model}</p>
        </div>
    );
}

export default Car;
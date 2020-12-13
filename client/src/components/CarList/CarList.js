import React from 'react';
import CarListItem from './CarListItem';

const CarList = props => {
    const {cars, clickCar, deleteCar, editCar} = props;
    return cars.map(car => (
        <CarListItem 
            key={car.id}
            car={car}
            clickCar={clickCar}
            deleteCar={deleteCar}
            editCar={editCar}/>
    ));
}

export default CarList;
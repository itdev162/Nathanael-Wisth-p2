import React from 'react';
import {useHistory} from 'react-router-dom';
import slugify from 'slugify';
import './styles.css';

const CarListItem = props => {
    const {car, clickCar, deleteCar, editCar} = props;
    const history = useHistory();

    const handleClickCar = car => {
        const slug = slugify(car.make + " " + car.model, {lower: true});

        clickCar(car);
        history.push(`/posts/${slug}`);
    };

    const handleEditCar = car => {
        editCar(car);
        history.push(`/edit-post/${car.id}`);
    };

    return (
        <div>
            <div>
                <div className="carListItem" onClick={() => handleClickCar(car)}>
                    <h2>{car.model}</h2>
                    <p>{car.year + " " + car.make}</p>
                </div>
            </div>
            <div className="carControls">
                <button onClick={() => deleteCar(car)}>Delete</button>
                <button onClick={() => handleEditCar(car)}>Edit</button>
            </div>
        </div>
    );
}

export default CarListItem;
import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import './styles.css';

const EditCar = ({car, onCarUpdated}) => {
    let history = useHistory();
    const [carData, setCarData] = useState({
        year: car.year,
        make: car.make,
        model: car.model
    });
    const {year, make, model} = carData;

    const onChange = e => {
        const {name, value} = e.target;

        setCarData({
            ...carData,
            [name]: value
        });
    };

    const update = async () => {
        if(!year || !make || !model){
            console.log('Year, make, and model required.');
        }else{
            const newCar = {
                id: car.id,
                year: year,
                make: make,
                model: model
            };

            try{
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const body = JSON.stringify(newCar);
                const res = await axios.put(
                    'http://localhost:5000/api/posts',
                    body,
                    config
                );

                onCarUpdated(res.data);
                history.push('/');
            }catch(error){
                console.error(`Error creating car: ${error.response.data}`);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Car</h2>
            <input
                name="year"
                type="number"
                placeholder="Year"
                value={year}
                onChange={e => onChange(e)}
            />
            <input
                name="make"
                type="text"
                placeholder="Make"
                value={make}
                onChange={e => onChange(e)}
            />
            <input
                name="model"
                type="text"
                placeholder="Model"
                value={model}
                onChange={e => onChange(e)}
            />
            <button onClick={() => update()}>Submit</button>
        </div>
    );
};

export default EditCar;
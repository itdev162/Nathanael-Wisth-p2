import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CarList from './components/CarList/CarList';
import Car from './components/Car/Car';
import CreateCar from './components/Car/CreateCar';
import EditCar from './components/Car/EditCar';

class App extends React.Component {
  state = {
    cars: [],
    car: null
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        this.setState({
          cars: response.data
        });
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }

  viewCar = (car) => {
    console.log(`view ${car.title}`);
    this.setState({
      car: car
    });
  }

  deleteCar = car => {
    axios
      .delete(`http://localhost:5000/api/posts/${car.id}`)
      .then(response => {
        const newCars = this.state.cars.filter(p => p.id !== car.id);
        this.setState({
          cars: [...newCars]
        });
      })
      .catch(error => {
        console.error(`Error deleting car: ${error}`);
      });
  };

  editCar = car => {
    this.setState({
      car: car
    });
  };

  onCarCreated = car => {
    const newCars = [...this.state.cars, car];

    this.setState({
      cars: newCars
    });
  };

  onCarUpdated = car => {
    console.log('updated car: ', car);
    const newCars = [...this.state.cars];
    const index = newCars.findIndex(p => p.id === car.id);

    newCars[index] = car;
    
    this.setState({
      cars: newCars
    });
  };

  render(){
    return (
      <Router>
        <div className="App">
          <header className="App-header">CarList</header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/new-post">New Car</Link>
          </nav>
          <main className="App-content">
            <Switch>
              <Route exact path="/">
                <CarList
                  cars={this.state.cars}
                  clickCar={this.viewCar}
                  deleteCar={this.deleteCar}
                  editCar={this.editCar}
                />
              </Route>
              <Route path="/posts/:postId">
                <Car car={this.state.car}/>
              </Route>
              <Route path="/new-post">
                <CreateCar onCarCreated={this.onCarCreated}/>
              </Route>
              <Route path="/edit-post/:postId">
                <EditCar car={this.state.car} onCarUpdated={this.onCarUpdated}/>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

import React, {PureComponent} from "react";

import "./app.css";
import {DatePicker} from 'antd';
import Header from "../header/header";
import SearchForm from "../search-form/search-form";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from '../swapi-service-context/swapi-service-context'

export default class App extends PureComponent {
  maxId = 100;

  // constructor(props) {
  //   super(props);
  //   this.getMovies();
  // }

  componentDidMount() {
    this.getMovies();
    this.getNewGuestSessionId()
    console.log('didMount')

  }

  state = {
    input: 'return',
    arrMovies: [],
    loading: true,
    error: false,
    guestSessionId:0
  };

  swapiService = new SwapiService();

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  getNewGuestSessionId() {
    console.log('getNewGuestSessionId');
    this.swapiService.getGuestSessionId()
      .then((guestSessionId) => {
        console.log(guestSessionId)
        this.setState({
          guestSessionId: guestSessionId
        })
      }).catch(this.onError);
  }



  getMovies(query) {
    this.swapiService.getSearchMovies(query)
      .then((arr) => {
        console.log(arr)
        this.setState({
          arrMovies: arr,
          loading: false,
        })
      }).catch(this.onError);
  }

  addItem=(input)=> {
    console.log(input)
    // this.setState({
    //   input: input,
    // })
    this.getMovies(input);
  }

  render() {

    const {arrMovies, loading, error} = this.state;
    console.log(arrMovies)

    return (
      <section className="container">
        <SwapiServiceProvider value={this.swapiService}>
        <header className="header">
          <Header arrMovies={arrMovies} loading={loading} error={error} addItem={this.addItem} guestSessionId={this.state.guestSessionId}/>

        </header>
        <section className="main">

          {/*<TaskList*/}
          {/*    todos={this.showItems(this.state.todoData)}*/}
          {/*    onDeleted={this.deleteItem}*/}
          {/*    onToggleDone={this.onToggleDone}*/}
          {/*/>*/}
        </section>
        </SwapiServiceProvider>
      </section>
    );
  }
}
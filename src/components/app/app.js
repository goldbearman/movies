import React, {PureComponent} from "react";

import "./app.css";
import {DatePicker} from 'antd';
import Header from "../header/header";
import SearchForm from "../search-form/search-form";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from '../swapi-service-context/swapi-service-context'

export default class App extends PureComponent {
  maxId = 100;

  componentDidMount() {
    this.getMovies();
    this.getNewGuestSessionId()
  }

  state = {
    input: 'return',
    arrMovies: [],
    totalResults:0,
    loading: true,
    error: false,
    guestSessionId: 0
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

  getMovies(query, page) {
    this.swapiService.getSearchMovies(query, page)
      .then((obj) => {
        console.log(obj.total_results)

        this.setState({
          arrMovies: obj.results,
          totalResults:obj.total_results,
          loading: false,
        })
      }).catch(this.onError);
  }

  addItem = (input,page) => {
    this.getMovies(input,page);
  }

  render() {

    const {arrMovies, loading, error,totalResults} = this.state;

    return (
      <section className="container">
        <SwapiServiceProvider value={this.swapiService}>
          <header className="header">
            <Header arrMovies={arrMovies}
                    loading={loading}
                    error={error}
                    addItem={this.addItem}
                    guestSessionId={this.state.guestSessionId}
                    totalResults = {this.state.totalResults}
            />

          </header>
        </SwapiServiceProvider>
      </section>
    );
  }
}
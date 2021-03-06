import React, { PureComponent } from "react";

import "./app.css";
// import MainContainer from "../main-container/main-container";
import MainContainerChange from "../main-container/main-container-change";
import SwapiService from "../../services/swapi-service";
import { SwapiServiceProvider } from "../../swapi-service-context/swapi-service-context";

export default class App extends PureComponent {
  maxId = 100;

  componentDidMount() {
    this.getMovies();
    this.getNewGuestSessionId();
  }

  state = {
    input: "return",
    arrMovies: [],
    totalResults: 0,
    loading: true,
    error: false,
    guestSessionId: "",
  };

  swapiService = new SwapiService();

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  getNewGuestSessionId() {
    this.swapiService
      .getGuestSessionId()
      .then((guestSessionId) => {
        this.setState({
          guestSessionId,
        });
      })
      .catch(this.onError);
  }

  getMovies(query, page) {
    this.swapiService
      .getSearchMovies(query, page)
      .then((obj) => {
        this.setState({
          arrMovies: obj.results,
          totalResults: obj.total_results,
          loading: false,
          error: false,
        });
      })
      .catch(this.onError);
  }

  addItem = (input, page) => {
    this.getMovies(input, page);
  };

  render() {
    const { arrMovies, loading, error } = this.state;

    return (
      <section className="container">
        <SwapiServiceProvider value={this.swapiService}>
          <main className="header">
            <MainContainerChange
              arrMovies={arrMovies}
              loading={loading}
              error={error}
              addItem={this.addItem}
              guestSessionId={this.state.guestSessionId}
              totalResults={this.state.totalResults}
            />
          </main>
        </SwapiServiceProvider>
      </section>
    );
  }
}

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Row, Col, Space, Spin, Alert } from "antd";

import "./movie-list.css";
import Movie from "../movie/movie";
import ErrorIndicator from "../error-indicator/error-indicator";
import { SwapiServiceConsumer } from "../swapi-service-context/swapi-service-context";

export default class MovieList extends PureComponent {
  static defaultProps = {
    arrMovies: [],
  };

  // const { arrMovies, loading, error, page, guestSessionId, arrRateMovie } =
  // this.props;

  static propTypes = {
    arrMovies: PropTypes.arrayOf(PropTypes.object),
    arrRateMovie: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.bool,
    guestSessionId: PropTypes.string,
    totalResults: PropTypes.number,
    page: PropTypes.number,
    addItem: PropTypes.func,
    isRateMovie: PropTypes.bool,
  };

  state = {
    idSession: 0,
    arrMovies: [],
    changeRateArr: [],
  };

  setChangeRateArr = (obj) => {
    const stateArr = this.state.changeRateArr;
    stateArr.push(obj);
    this.setState({
      changeRateArr: stateArr,
    });
  };

  createList = (
    arrMovies,
    page,
    guestSessionId,
    getAllGenres,
    setChangeRateArr
  ) => {
    const elements = arrMovies.map((movie) => {
      this.state.changeRateArr.forEach((objIdStars) => {
        const copyMovie = movie;
        if (copyMovie.id === objIdStars.idRate) {
          copyMovie.rating = objIdStars.stars;
        }
      });

      return (
        <Col flex="1 1 487px" key={movie.id}>
          <Movie
            key={movie.id}
            movie={movie}
            guestSessionId={guestSessionId}
            getAllGenres={getAllGenres}
            setChangeRateArr={setChangeRateArr}
          />
        </Col>
      );
    });
    return elements;
  };

  render() {
    const { arrMovies, loading, error, page, guestSessionId, isRateMovie } =
      this.props;

    const hasData = !(loading || error);

    const onErrorMessage = error ? <ErrorIndicator /> : null;
    const onSpinner = loading ? <MovieSpinner /> : null;
    const onEmptyArr =
      arrMovies.length === 0 && !loading && !isRateMovie && !error ? (
        <Alert
          message="Nothing was found for your search"
          type="info"
          showIcon
        />
      ) : null;
    const onEmptyRateArr =
      arrMovies.length === 0 && !loading && isRateMovie && !error ? (
        <Alert
          message="You didn't give ratings to the films"
          type="info"
          showIcon
        />
      ) : null;

    return (
      <SwapiServiceConsumer>
        {({ getAllGenres }) => {
          return (
            <React.Fragment>
              {onSpinner}
              {onEmptyArr}
              {onEmptyRateArr}
              {onErrorMessage}
              {hasData ? (
                <Row
                  gutter={[38, 38]}
                  lg={{ gutter: 16 }}
                  className="movie-list"
                >
                  {this.createList(
                    arrMovies,
                    page,
                    guestSessionId,
                    getAllGenres,
                    this.setChangeRateArr
                  )}
                </Row>
              ) : null}
            </React.Fragment>
          );
        }}
      </SwapiServiceConsumer>
    );
  }
}

const MovieSpinner = () => {
  return (
    <Space className="movie-spinner" size="middle">
      <Spin size="large" />
    </Space>
  );
};

import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import 'antd/dist/antd.css';
import {Row, Col, Slider, Space, Spin, Alert} from 'antd';

import "./movie-list.css";
import Movie from "../movie/movie";
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator/error-indicator";
import {SwapiServiceConsumer} from '../swapi-service-context/swapi-service-context'

export default class MovieList extends PureComponent {

  state = {
    idSession: 0,
    arrMovies: [],
    changeRateArr: []
  }

  componentDidMount() {
    console.log("componentDidMount movie-list")
    // this.setArrMovies();
  }

  setChangeRateArr = (obj) => {
    console.log(obj)
    // console.log(this.state.idSession)
    // console.log(this.state.arrMovies)
    // console.log(this.state.changeRateA)
    let stateArr = this.state.changeRateArr;
    console.log(stateArr)
    stateArr.push(obj);
    console.log(stateArr);
    this.setState({
      changeRateArr: stateArr
    });
  }

  createList = (arrMovies, page, guestSessionId, getAllGenres, setChangeRateArr) => {
    console.log('createList')
    const elements = arrMovies.map((movie) => {

      this.state.changeRateArr.forEach((objIdStars) => {
        if (movie.id === objIdStars.idRate) {
          console.log(movie.id);
          movie.rating = objIdStars.stars;
        }
      });

      console.log(movie);
      // movie.rating = stars;

      return (
       <Col  flex="1 1 487px">
          <Movie key={movie.id}
                 movie={movie}
                 guestSessionId={guestSessionId}
                 getAllGenres={getAllGenres}
                 setChangeRateArr={setChangeRateArr}
          />
       </Col>
      );
    });

    // return elements.slice((page - 1) * 6, page * 6);
    return elements;
  };

  render() {

    const {arrMovies, loading, error, page, guestSessionId, arrRateMovie} = this.props;
    console.log(guestSessionId)
    console.log(arrMovies)

    const hasData = !(loading || error);
    console.log(hasData)
    const onErrorMessage = error ? <ErrorIndicator/> : null;
    const onSpinner = loading ? <MovieSpinner/> : null;
    const onEmptyArr = arrMovies.length===0&&!loading&&!arrRateMovie&&!error? <Alert message="Nothing was found for your search" type="info" showIcon/>:null
    const onEmptyRateArr = arrMovies.length===0&&!loading&&arrRateMovie&&!error? <Alert message="You didn't give ratings to the films" type="info" showIcon/>:null

    return (
      <SwapiServiceConsumer>
        {
          ({getAllGenres}) => {
            return (
              <React.Fragment>
                {onSpinner}
                {onEmptyArr}
                {onEmptyRateArr}
                {onErrorMessage}
                {hasData ?
                  <Row gutter={[38,38]} lg={{ gutter: 16 }} className="movie-list">
                    {this.createList(arrMovies, page, guestSessionId, getAllGenres, this.setChangeRateArr)}
                  </Row> : null}
              </React.Fragment>
            )
          }
        }
      </SwapiServiceConsumer>
    );
  }
};

const MovieSpinner = () => {
  return (<Space className="movie-spinner" size="middle">
    <Spin size="large"/>
  </Space>)
};






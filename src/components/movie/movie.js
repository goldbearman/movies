import React, {PureComponent} from "react";
// import { formatDistanceToNow } from "date-fns";
import {Rate} from 'antd';
import SwapiService from "../../services/swapi-service";
import {format} from 'date-fns'
import Genres from "./genres";
import icon from './no-image.jpg'


import 'antd/dist/antd.css';
import "./movie.css"

import {Row, Col, Slider} from 'antd';


export default class Movie extends PureComponent {

  state = {
    movie: {},
    rateDefault: 0,
    allGenres: [],
    rating: 0
  };

  componentDidMount() {
    this.setMovie();
    this.getGenres();
  }

  setMovie() {
    this.setState({
      movie: this.props.movie,
      rateDefault: this.props.movie.rating
    })
  }

  swapiService = new SwapiService();


  getGenres = () => {
    this.props.getAllGenres().then(arrgenres => {
      this.setState({
        allGenres: arrgenres.genres
      });
    });
  }


  trimText(text) {
    if (text.length > 90) {
      let whitespaceIndex = text.indexOf(' ', 90);
      let newText = text.slice(0, whitespaceIndex);
      return newText+' ...';
    }
    return text;
  }

  onColorRate(rate) {
    let setColor = "rating";
    if (rate > 10 && rate < 0) setColor += " brown";
    if (rate <= 3 && rate >= 0) setColor += " red";
    if (rate <= 5 && rate > 3) setColor += " orange";
    if (rate <= 7 && rate > 5) setColor += " yellow";
    if (rate <= 10 && rate > 7) setColor += " green";
    return setColor;
  }

  onChangeStars = (stars) => {
    this.setState({
      rateDefault: stars
    });
    const idRate = this.props.movie.id;
    this.props.setChangeRateArr({idRate, stars})
    this.swapiService.postRate(stars, this.props.movie.id, this.props.guestSessionId).then(result => console.log(result))
  }


  checkDate(releaseDate) {
    let date;
    try {
      date = format(new Date(releaseDate), 'MMMM dd, yyyy');
    } catch (e) {
      let date = "";
    }
    return date;
  }

  render() {

    const {movie: {vote_average, original_title, overview, poster_path, release_date, rating, genre_ids}} = this.props

    let poster;
    if (poster_path) {
      poster = `https://image.tmdb.org/t/p/w185/${poster_path}`;
    } else poster = icon;

    return (
      //<Col span={12}>
      <div className='card'>
        <img className="card__poster" src={poster}
             alt="Poster"/>
        <div className="card__content">
          <div className={this.onColorRate(vote_average,)}>
            <div>{vote_average}</div>
          </div>
          <h1>{original_title}</h1>
          <div className="date">{this.checkDate(release_date)}</div>
          <Genres allGenres={this.state.allGenres} movieGenres={genre_ids}/>
          <div>
            <p>
              {this.trimText(overview)}
            </p>
          </div>
        </div>
        <Rate className="stars" count="10" defaultValue={this.state.rateDefault}
              onChange={this.onChangeStars} value={this.state.rateDefault}/>
      </div>
      // </Col>
    );
  }
}
import React, { PureComponent } from "react";
import { Rate } from "antd";
import { format } from "date-fns";
import PropTypes from "prop-types";
import SwapiService from "../../services/swapi-service";
import Genres from "./genres";
import icon from "./no-image.jpg";

import "antd/dist/antd.css";
import "./movie.css";

export default class Movie extends PureComponent {
  static defaultProps = {};

  static propTypes = {
    movie: PropTypes.object,
    vote_average: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.bool,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    rating: PropTypes.number,
    genre_ids: PropTypes.number,
    getAllGenres: PropTypes.func,
    setChangeRateArr: PropTypes.func,
    guestSessionId: PropTypes.string,
  };

  state = {
    movie: {},
    rateDefault: 0,
    allGenres: [],
    rating: 0,
  };

  componentDidMount() {
    this.setMovie();
    this.getGenres();
  }

  setMovie() {
    this.setState({
      movie: this.props.movie,
      rateDefault: this.props.movie.rating,
    });
  }

  swapiService = new SwapiService();

  getGenres() {
    this.props.getAllGenres().then((arg) => {
      this.setState({
        allGenres: arg.genres,
      });
    });
  }

  trimText = (text) => {
    if (text.length > 90) {
      const whitespaceIndex = text.indexOf(" ", 90);
      const newText = text.slice(0, whitespaceIndex);
      return `${newText} ...`;
    }
    return text;
  };

  onColorRate = (rate) => {
    let setColor = "rating";
    if (rate > 10 && rate < 0) setColor += " brown";
    if (rate <= 3 && rate >= 0) setColor += " red";
    if (rate <= 5 && rate > 3) setColor += " orange";
    if (rate <= 7 && rate > 5) setColor += " yellow";
    if (rate <= 10 && rate > 7) setColor += " green";
    return setColor;
  };

  onChangeStars = (stars) => {
    this.setState({
      rateDefault: stars,
    });
    const idRate = this.props.movie.id;
    this.props.setChangeRateArr({ idRate, stars });
    this.swapiService.postRate(
      stars,
      this.props.movie.id,
      this.props.guestSessionId
    );
  };

  checkDate = (releaseDate) => {
    let date;
    try {
      date = format(new Date(releaseDate), "MMMM dd, yyyy");
    } catch (e) {
      date = "";
    }
    return date;
  };

  render() {
    const {
      movie: {
        // eslint-disable-next-line camelcase
        vote_average,
        // eslint-disable-next-line camelcase
        original_title,
        overview,
        // eslint-disable-next-line camelcase
        poster_path,
        // eslint-disable-next-line camelcase
        release_date,
        // eslint-disable-next-line camelcase
        genre_ids,
      },
    } = this.props;

    let poster;
    // eslint-disable-next-line camelcase
    if (poster_path) {
      // eslint-disable-next-line camelcase
      poster = `https://image.tmdb.org/t/p/w185/${poster_path}`;
    } else poster = icon;

    return (
      <div className="card">
        <img className="card__poster" src={poster} alt="Poster" />
        <div className="card__content">
          <div className={this.onColorRate(vote_average)}>
            {/* eslint-disable-next-line camelcase */}
            <div>{vote_average}</div>
          </div>
          {/* eslint-disable-next-line camelcase */}
          <h1>{original_title}</h1>
          <div className="date">{this.checkDate(release_date)}</div>
          {/* eslint-disable-next-line camelcase */}
          <Genres allGenres={this.state.allGenres} movieGenres={genre_ids} />
          <div>
            <p>{this.trimText(overview)}</p>
          </div>
        </div>
        <Rate
          className="stars"
          count="10"
          defaultValue={this.state.rateDefault}
          onChange={this.onChangeStars}
          value={this.state.rateDefault}
        />
      </div>
    );
  }
}

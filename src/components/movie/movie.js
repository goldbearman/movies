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
    height: 0,
  };

  constructor(props) {
    super(props);
    this.myInput = React.createRef();
    this.rateHeight = 0;
    // this.ref = React.createRef();
  }

  componentDidMount() {
    this.setMovie();
    this.getGenres();

    this.setState({
      height: this.myInput.current.offsetHeight,
    });
    // eslint-disable-next-line no-console
    console.log(this.myInput.current.offsetHeight);
    // eslint-disable-next-line no-console
    console.log(
      this.myInput.current.clientHeight + this.props.movie.original_title
    );
    // eslint-disable-next-line no-console
    console.log(this.rateHeight);
    const num = 224 - this.myInput.current.offsetHeight;
    // eslint-disable-next-line no-console
    console.log(num);
    this.linesNumber = (num / 18) * 34;
    // eslint-disable-next-line no-console
    // console.log(this.linesNumber);
    // this.correctText();
  }

  getHeight = (height) => {
    // eslint-disable-next-line no-console
    console.log(height);
    this.setState({
      height,
    });
  };

  correctText = (text) => {
    // eslint-disable-next-line no-console
    console.log(this.state.height + this.props.movie.original_title);
    return this.trimText(text, this.linesNumber);
  };

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

  trimText = (text, size) => {
    if (text.length > size) {
      const whitespaceIndex = text.indexOf(" ", size);
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
          <div
            className="without-text"
            /* eslint-disable-next-line no-return-assign */
            ref={this.myInput}
          >
            <div className={this.onColorRate(vote_average)}>
              {/* eslint-disable-next-line camelcase */}
              <div>{vote_average}</div>
            </div>
            {/* eslint-disable-next-line camelcase */}
            <h1>{this.trimText(original_title, 40)}</h1>
            <div className="date">{this.checkDate(release_date)}</div>
            {/* eslint-disable-next-line camelcase */}
            <Genres
              allGenres={this.state.allGenres}
              movieGenres={genre_ids}
              getHeight={this.getHeight}
              /* eslint-disable-next-line no-return-assign */
              ref={(myRefMovie) => (this.myRefMovie = myRefMovie)}
            />
          </div>
          <div>
            <p>{this.correctText(overview)}</p>
          </div>
        </div>
        <Rate
          allowHalf
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

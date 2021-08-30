import { Tabs, Pagination } from "antd";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import "antd/dist/antd.css";
import "./main-container.css";
import SearchForm from "../search-form/search-form";
import MovieList from "../movie-list/movie-list";
import SwapiService from "../../services/swapi-service";

const { TabPane } = Tabs;

export default class MainContainer extends PureComponent {
  static defaultProps = {
    arrMovies: [],
  };

  static propTypes = {
    arrMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    guestSessionId: PropTypes.string,
    totalResults: PropTypes.number,
    addItem: PropTypes.func,
  };

  state = {
    page: 1,
    searchItem: "return",
    pageRate: 1,
    rateMovie: [],
    rateTotalResults: 0,
    arrMovies: [],
    errorRate: false,
    loadingRate: true,
    allGenres: [],
  };

  swapiService = new SwapiService();

  componentDidMount() {
    // this.setMovie();
    this.getGenres();
  }

  componentDidCatch() {
    this.setState({
      errorRate: true,
    });
  }

  getRateMovies = () => {
    this.swapiService
      .getRateMovie(this.props.guestSessionId)
      .then((rateMovie) => {
        this.setState({
          rateMovie: rateMovie.results,
          rateTotalResults: rateMovie.total_results,
          pageRate: 1,
          loadingRate: false,
        });
      })
      .catch(this.onError);
  };

  getGenres() {
    this.swapiService.getAllGenres().then((arg) => {
      this.setState({
        allGenres: arg.genres,
      });
    });
  }

  onErrorRate = () => {
    this.setState({
      errorRate: true,
      loadingRate: false,
    });
  };

  onChange = (page) => {
    this.props.addItem(this.state.searchItem, page);
    this.setState({
      page,
    });
  };

  onChangeRate = (pageRate) => {
    this.swapiService
      .getRateMovie(this.props.guestSessionId, pageRate)
      .then((rateMovie) => {
        this.setState({
          rateMovie: rateMovie.results,
          rateTotalResults: rateMovie.total_results,
          pageRate,
        });
      })
      .catch(this.onErrorRate);
  };

  addItem = (item) => {
    this.setState({
      searchItem: item,
      page: 1,
    });
    this.props.addItem(item);
  };

  render() {
    const { arrMovies, loading, error, guestSessionId, totalResults } =
      this.props;

    return (
      <Tabs mb={10} defaultActiveKey="1" onChange={this.getRateMovies}>
        <TabPane tab="Search" key="1">
          <SearchForm onItemAdded={this.addItem} />
          <MovieList
            arrMovies={arrMovies}
            page={this.state.page}
            guestSessionId={guestSessionId}
            loading={loading}
            error={error}
            allGenres={this.state.allGenres}
          />
          <div className="pagination-container">
            {error ? null : (
              <Pagination
                defaultCurrent={1}
                current={this.state.page}
                total={totalResults}
                defaultPageSize={20}
                showSizeChanger={false}
                onChange={this.onChange}
                hideOnSinglePage={true}
              />
            )}
          </div>
        </TabPane>{" "}
        <TabPane tab="Rated" key="2">
          <MovieList
            arrMovies={this.state.rateMovie}
            page={this.state.pageRate}
            loading={this.state.loadingRate}
            guestSessionId={guestSessionId}
            error={this.state.errorRate}
            allGenres={this.state.allGenres}
            isRateMovie={true}
          />
          <div className="pagination-container">
            {error ? null : (
              <Pagination
                defaultCurrent={1}
                current={this.state.pageRate}
                total={this.state.rateTotalResults}
                defaultPageSize={20}
                onChange={this.onChangeRate}
                hideOnSinglePage={true}
              />
            )}
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

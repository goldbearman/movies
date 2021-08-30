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
    arrMovies: [],
    page: 1,
    searchItem: "return",
    pageRate: 1,
    rateMovie: [],
    totalResults: 0,
    errorRate: false,
    loadingRate: true,
    allGenres: [],
    loading: true,
    isRateMovie: false,
  };

  swapiService = new SwapiService();

  componentDidMount() {
    // this.setMovie();
    this.getGenres();
  }

  componentDidUpdate(prevProps) {
    if (this.props.arrMovies !== prevProps.arrMovies) {
      this.setState({
        arrMovies: this.props.arrMovies,
        loading: this.props.loading,
        totalResults: this.props.totalResults,
      });
    }
  }

  componentDidCatch() {
    this.setState({
      errorRate: true,
    });
  }

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
    this.setState({
      loading: true,
    });
    const { arrMovies, totalResults } = this.props;
    if (!this.state.isRateMovie) {
      this.props.addItem(this.state.searchItem, page);
      this.setState({
        arrMovies,
        totalResults,
        page,
      });
    }
    if (this.state.isRateMovie) {
      this.swapiService
        .getRateMovie(this.props.guestSessionId, page)
        .then((rateMovie) => {
          this.setState({
            arrMovies: rateMovie.results,
            totalResults: rateMovie.total_results,
            page,
            loading: false,
          });
        })
        .catch(this.onErrorRate);
    }
  };

  addItem = (item) => {
    this.setState({
      searchItem: item,
      page: 1,
    });
    this.props.addItem(item);
  };

  getRateMovies = (key) => {
    const { arrMovies, loading, error, totalResults } = this.props;
    if (key === "1") {
      this.setState({
        arrMovies,
        totalResults,
        loading,
        error,
        isRateMovie: false,
      });
    }
    if (key === "2") {
      this.setState({
        loading: true,
      });
      this.swapiService
        .getRateMovie(this.props.guestSessionId)
        .then((rateMovie) => {
          this.setState({
            arrMovies: rateMovie.results,
            totalResults: rateMovie.total_results,
            loading: false,
            isRateMovie: true,
          });
        })
        .catch(this.onError);
    }
  };

  render() {
    const { error, guestSessionId } = this.props;

    return (
      <>
        <Tabs mb={10} defaultActiveKey="1" onChange={this.getRateMovies}>
          <TabPane tab="Search" key="1">
            <SearchForm onItemAdded={this.addItem} />
          </TabPane>
          <TabPane tab="Rated" key="2"></TabPane>
        </Tabs>
        <MovieList
          arrMovies={this.state.arrMovies}
          page={this.state.page}
          guestSessionId={guestSessionId}
          loading={this.state.loading}
          error={this.state.error}
          allGenres={this.state.allGenres}
          isRateMovie={this.state.isRateMovie}
        />
        <div className="pagination-container">
          {error ? null : (
            <Pagination
              defaultCurrent={1}
              current={this.state.page}
              total={this.state.totalResults}
              defaultPageSize={20}
              onChange={this.onChange}
              hideOnSinglePage={true}
              showSizeChanger={false}
            />
          )}
        </div>
      </>
    );
  }
}

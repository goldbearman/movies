import React, {PureComponent} from "react";
import {Tabs, Pagination} from 'antd';

import 'antd/dist/antd.css';
import './header.css'
import SearchForm from "../search-form/search-form";
import Movie from "../movie/movie";
import MovieList from "../movie-list/movie-list";
import SwapiService from "../../services/swapi-service";

const {TabPane} = Tabs;

export default class Header extends PureComponent {

  state = {
    page: 1,
    searchItem: 'return',
    pageRate: 1,
    rateMovie: [],
    rateTotalResults: 0,
    arrMovies: []
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.arrMovies !== prevProps.arrMovies) {
      this.setArrMovie();
    }
  }

  setArrMovie() {
    console.log(this.props.arrMovies)

    this.setState({
      arrMovies: this.props.arrMovies
    })
  }

  swapiService = new SwapiService();

  getRateMovies = (activeKey) => {
    console.log('getRateMovies');
    console.log(this.props.guestSessionId + " guestSessionId");
    this.swapiService.getRateMovie(this.props.guestSessionId)
      .then((rateMovie) => {
        console.log(rateMovie)
        console.log(rateMovie.total_results)
        this.setState({
          rateMovie: rateMovie.results,
          rateTotalResults: rateMovie.total_results,
          pageRate: 1
        })
      }).catch(this.onError);
    // }
  }

  onChange = (page) => {
    this.props.addItem(this.state.searchItem, page);
    this.setState({
      page: page
    })
  }

  onChangeRate = (pageRate) => {
    console.log(this.props.guestSessionId + " guestSessionId");
    this.swapiService.getRateMovie(this.props.guestSessionId, pageRate)
      .then((rateMovie) => {
        console.log(rateMovie.results)
        console.log(rateMovie.total_results)
        this.setState({
          rateMovie: rateMovie.results,
          rateTotalResults: rateMovie.total_results,
          pageRate: pageRate
        })
      }).catch(this.onError);
  }

  addItem = (item) => {
    this.setState({
      searchItem: item,
    });
    this.props.addItem(item);
  }

  render() {

    const {loading, error, guestSessionId, totalResults} = this.props;
    console.log(totalResults)

    return (
      <Tabs mb={10} defaultActiveKey="1" onChange={this.getRateMovies}>
        <TabPane tab="Search" key="1">
          <SearchForm onItemAdded={this.addItem}/>
          <MovieList arrMovies={this.state.arrMovies} loading={loading} error={error} page={this.state.page}
                     guestSessionId={guestSessionId}/>
          <div className='pagination-container'>
            {error ? null : <Pagination
              defaultCurrent={1}
              current={this.state.page}
              total={totalResults}
              defaultPageSize={20}
              showSizeChanger={false}
              onChange={this.onChange}
              hideOnSinglePage={true}/>}
          </div>
        </TabPane> <TabPane tab="Rated" key="2">
        <MovieList arrMovies={this.state.rateMovie} loading={loading} error={error} page={this.state.pageRate}
                   guestSessionId={guestSessionId} arrRateMovie={true}/>
        <div className='pagination-container'>
          {error ? null : <Pagination
            defaultCurrent={1}
            current={this.state.pageRate}
            total={this.state.rateTotalResults}
            defaultPageSize={20}
            onChange={this.onChangeRate}
            hideOnSinglePage={true}/>}
        </div>
      </TabPane>
      </Tabs>
    )
  }
};

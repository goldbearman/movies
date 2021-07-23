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
    pageRate:1,
    rateMovie: [],
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

  /////////////////////////////////////////////

  swapiService = new SwapiService();

  getRateMovies = (activeKey) => {
    console.log(activeKey);
    if (activeKey === '2') {
      console.log("in")
      console.log(this.props.guestSessionId)
      // this.swapiService.getRateMovie(this.props.guestSessionId)
      this.swapiService.getRateMovie(this.props.guestSessionId)
        .then((rateMovie) => {
          console.log(rateMovie.results)
          this.setState({
            rateMovie: rateMovie.results
          })
        }).catch(this.onError);
    }
  }


  ///////////////////////////////////////////////

  onChange = (page) => {

    this.setState({
      page: page
    })
  }

  onChangeRate = (pageRate) => {
    this.setState({
      pageRate: pageRate
    })
  }

  addItem = (item) => {
    this.props.addItem(item);
  }

  render() {

    const {loading, error, addItem, guestSessionId} = this.props;
    console.log(this.props.arrMovies)
    console.log(this.state.arrMovies)
    console.log(this.state.rateMovie)
    console.log(guestSessionId)

    return (
      <Tabs defaultActiveKey="1" onChange={this.getRateMovies}>
        <TabPane tab="Search" key="1">
          <SearchForm onItemAdded={this.addItem}/>
          <MovieList arrMovies={this.state.arrMovies} loading={loading} error={error} page={this.state.page}
                     guestSessionId={guestSessionId}/>
          <div className='pagination-container'>
            <Pagination defaultCurrent={1}
                        total={100}
                        // PageSize={20}
                        onChange={this.onChange}/>
          </div>
          {/*Content of Tab Pane 1*/}
        </TabPane>
        <TabPane tab="Rated" key="2">
          <MovieList arrMovies={this.state.rateMovie} loading={loading} error={error} page={this.state.pageRate}
                     guestSessionId={guestSessionId} hideOnSinglePage={true}   />
          Content of Tab Pane 2
          <div className='pagination-container'>
            <Pagination defaultCurrent={1} total={this.state.rateMovie.length}
                        defaultPageSize={6}
                        onChange={this.onChangeRate}
                        hideOnSinglePage={true} />
          </div>
        </TabPane>
      </Tabs>
    )
  }
};

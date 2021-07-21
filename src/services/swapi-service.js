export default class SwapiService {

  _apiBase = 'https://api.themoviedb.org';
  _apiKey = '864cd2acdebdfd281550947ea6066439';

  // constructor(){
  //   this.guestSessionId = this.getGuestSessionId();
  // }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json();
  }

  async getSearchMovies(query='return') {
    const res = await this.getResource(`/3/search/movie?api_key=864cd2acdebdfd281550947ea6066439&query=${query}`);

    return res.results;
  }

  // async getSearchMovie() {
  //   const res = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=864cd2acdebdfd281550947ea6066439`);
  //   const r = await res.json();
  //   return r;
  // }

  async getGuestSessionId(){
    const guestSession = await this.getResource(`/3/authentication/guest_session/new?api_key=${this._apiKey}`);
    // console.log(guestSession)
    const objRequest = await guestSession.guest_session_id;
    console.log(objRequest);
    return objRequest;
  };

  async postRate(stars, idMovie, guestSessionId) {
    console.log(stars, idMovie);
    const guestSession = guestSessionId;
    console.log(guestSession);
    const res = await fetch(`${this._apiBase}/3/movie/${idMovie}/rating?api_key=${this._apiKey}&guest_session_id=${guestSession}`, {
      // const res = await fetch(`https://api.themoviedb.org/3/movie/125521/rating?api_key=864cd2acdebdfd281550947ea6066439&guest_session_id=313ac9f5b38bf9ac4196e2e82f659c80`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        value: stars
      })
    });
    if (!res.ok) {
      throw new Error(`Could not fetch , received ${res.status}`)
    }
    console.log('ok')
    // return guestSession;
  }

  async getRateMovie(guestSessionId) {

    const result = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&sort_by=created_at.asc`);
    if (!result.ok) {
      throw new Error(`Could not fetch , received ${result.status}`)
    }
    const arr = await result.json();
    return arr;
  }

  async getAllGenres() {

    const result = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=864cd2acdebdfd281550947ea6066439`);
    if (!result.ok) {
      throw new Error(`Could not fetch , received ${result.status}`)
    }
    const arr = await result.json();
    console.log(arr)
    return arr;
  }

}
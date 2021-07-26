export default class SwapiService {
  _apiBase = "https://api.themoviedb.org";

  _apiKey = "864cd2acdebdfd281550947ea6066439";

  async getResource(url) {
    // eslint-disable-next-line no-underscore-dangle
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    // eslint-disable-next-line no-return-await
    return await res.json();
  }

  async getSearchMovies(query = "return", page = 1) {
    const res = await this.getResource(
      // eslint-disable-next-line no-underscore-dangle
      `/3/search/movie?api_key=${this._apiKey}&query=${query}&page=${page}`
    );
    console.log(res);
    return res;
  }

  async getGuestSessionId() {
    const guestSession = await this.getResource(
      // eslint-disable-next-line no-underscore-dangle
      `/3/authentication/guest_session/new?api_key=${this._apiKey}`
    );
    const objRequest = await guestSession.guest_session_id;
    console.log(typeof objRequest);
    return objRequest;
  }

  async postRate(stars, idMovie, guestSessionId) {
    console.log(stars, idMovie);
    const guestSession = guestSessionId;
    // console.log(guestSession);
    const res = await fetch(
      // eslint-disable-next-line no-underscore-dangle
      `${this._apiBase}/3/movie/${idMovie}/rating?api_key=${this._apiKey}&guest_session_id=${guestSession}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: stars,
        }),
      }
    );
    if (!res.ok) {
      throw new Error(`Could not fetch , received ${res.status}`);
    }
    console.log("ok");
  }

  async getRateMovie(guestSessionId, page = 1) {
    console.log(`${guestSessionId} guestSessionId`);
    const result = await fetch(
      // eslint-disable-next-line no-underscore-dangle
      `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&sort_by=created_at.asc&page=${page}`
    );
    if (!result.ok) {
      throw new Error(`Could not fetch , received ${result.status}`);
    }
    const arr = await result.json();
    console.log(arr);
    return arr;
  }

  getAllGenres = async () => {
    const result = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=864cd2acdebdfd281550947ea6066439`
    );
    if (!result.ok) {
      throw new Error(`Could not fetch , received ${result.status}`);
    }
    const arr = await result.json();
    return arr;
  };
}

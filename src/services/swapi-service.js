export default class SwapiService {
  _apiBase = "https://api.themoviedb.org";

  _apiKey = "864cd2acdebdfd281550947ea6066439";

  async getGuestSessionId() {
    const guestSession = await this.getResource(
      // eslint-disable-next-line no-underscore-dangle
      `/3/authentication/guest_session/new?api_key=${this._apiKey}`
    );
    const objRequest = await guestSession.guest_session_id;
    return objRequest;
  }

  async postRate(stars, idMovie, guestSessionId) {
    const guestSession = guestSessionId;
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
  }

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
    return res;
  }

  async getRateMovie(guestSessionId, page = 1) {
    const res = await this.getResource(
      // eslint-disable-next-line no-underscore-dangle
      `/3/guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&sort_by=created_at.asc&page=${page}`
    );
    return res;
  }

  getAllGenres = async () => {
    const res = await this.getResource(
      // eslint-disable-next-line no-underscore-dangle
      `/3/genre/movie/list?api_key=${this._apiKey}`
    );
    return res;
  };
}

export interface DiscoverResponse {

}

export interface SimilarResponse {

}

export interface GenresResponse {
  genres: Genre[];
}

export interface Genre {
  id: unknown;
  name: string;
}

export interface CreditsResponse {
  id: number;
  cast: Credit[];
  crew: Credit[];
}

export interface Credit {
  adult: false
  backdrop_path: null
  character: "Yorgo Galfanikos"
  credit_id: "52589f55760ee34661636af2"
  episode_count: 12
  first_air_date: "1997-10-21"
  genre_ids: [35]
  id: 31641
  name: "Over the Top"
  origin_country: ['US']
  original_language: "en"
  original_name: "Over the Top"
  overview: "Over the Top is an American sitcom starring Tim Curry, Annie Potts, and Steve Carell. The series premiered on ABC on October 21, 1997. Although 12 episodes were produced, the series was canceled after only three episodes had aired."
  popularity: 1.184
  poster_path: "/fSpb4JJU4wnjvdLfsIKkMcNjWMz.jpg"
  vote_average: 0
  vote_count: 0
}

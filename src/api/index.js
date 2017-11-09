import config from './config'

const { apiKey } = config

const URL = `https://ws.audioscrobbler.com/2.0`

export default function getArtist (selectedCountry) {
  const urlGetArist = `${URL}/?method=geo.gettopartists&country=${selectedCountry}&api_key=${apiKey}&format=json`

  return fetch(urlGetArist)
    .then(res => res.json())
    .then(json => json.topartists.artist)
}
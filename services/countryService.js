/**
 * Serviço para requisições na api aberta de países
 */
const API_URL = "https://restcountries.eu/rest/v2/";

export default axios => ({
  getCountriesByRegion(slug) {
    return axios.get(API_URL + "region/" + slug).catch(error => {
      throw new Error(`[API] ApiService ${error}`);
    });
  },
  getCountriesNames() {
    return axios
      .get(API_URL + "all" + "/?fields=name;alpha3Code;languages;flag")
      .catch(error => {
        throw new Error(`[API] ApiService ${error}`);
      });
  },
  getCountriesByName(slug) {
    return axios.get(API_URL + "name/" + slug).catch(error => {
      throw new Error(`[API] ApiService ${error}`);
    });
  },
  getCountriesByLanguage(slug) {
    return axios.get(API_URL + "lang/" + slug).catch(error => {
      throw new Error(`[API] ApiService ${error}`);
    });
  }
});

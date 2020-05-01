import axios from 'axios';

class SearchItem {
    constructor(page) {
        this.category = ['anime', 'manga'];
        this.page = page;
    }

    async getSearchResult(query) {
        let result = [];
        const anime = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${query}`);
        const manga = await axios.get(`https://api.jikan.moe/v3/search/manga?q=${query}`);
        result = anime.data.results.concat(manga.data.results);
        return result;
    }
}

export default SearchItem

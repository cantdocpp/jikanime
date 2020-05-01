import axios from 'axios';

class TopItem {
    constructor(page) {
        this.endpoint = `https://api.jikan.moe/v3/top/anime/${page}/upcoming`
    }

    async getTopAnimeList() {
        const response = await axios.get(this.endpoint);
        return response;
    }
}

export default TopItem

import axios from "axios";

export const bingImageLinkScrapper = async (search: string) => {
    const url = `https://www.bing.com/images/search?q=${search}`;
    const response = await axios.get(url);

    const re = /https:\/\/[0-9a-zA-Z.\/\-_]*\.(png|jpg|jpeg|gif|bmp|svg)/;
    const matches = response.data.match(re);

    const res = matches?.slice(0, 5) || [];

    const availableImages = await Promise.all(
        res.map(async (item: string) => {
            try {
                await axios.head(item);
                return item;
            } catch (error) {
                return "";
            }
        })
    );

    return availableImages.filter((i: string) => i !== "");
};

const { bingImageLinkScrapper } = require("./Helpers/Image");
import AsyncLoop from "./Helpers/AsyncLoop"
import axios from "axios";
// Define your regular expression properly
const re = /https:\/\/[0-9a-zA-Z.\/\-_]*\.(png|jpg|jpeg|gif|bmp|svg)/;

bingImageLinkScrapper("A bar magnet with magnetic field lines").then(async (res: any) => {
    res = res.map((i: string) => {
        let link = i.match(re)?.[0] || "";
        return link;
    });
    res = res.filter((i: string) => i !== "");

    res = await new AsyncLoop().run(res.slice(0, 5) as string[], async (item: any) => {
        let avail = await axios.get(item).then(() => true).catch(() => false);
        if (avail) return item
        else return ""
    })

    res = res.filter((i: string) => i !== "");

    require('fs').writeFileSync('test.json', JSON.stringify(res, null, 2));
});

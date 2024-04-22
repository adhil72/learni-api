import gTTS from 'gtts'
const language = 'en';

export default (text, path) => {
    const gttsInstance = new gTTS(text, language);
    return new Promise((resolve, reject) => {
        gttsInstance.save(path, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve('Audio file saved successfully!');
            }
        });
    });
}
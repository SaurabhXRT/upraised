const generateCodename = () => {
    const codenames = ['Nightingale', 'Kraken', 'Phoenix', 'Valkyrie', 'Osprey'];
    return `The ${codenames[Math.floor(Math.random() * codenames.length)]}`;
};

const generateSuccessProbability = () => {
    return Math.floor(Math.random() * 100) + 1;
};

module.exports = { generateCodename, generateSuccessProbability };
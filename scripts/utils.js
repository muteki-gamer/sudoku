function getRandomEleName() {
    const dictionary = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';
    for (let i = 0; i < 10; i++) {
        name += dictionary[Math.floor(Math.random() * 10)];
    }
    return name;
}
function rem(str: string){
    const words = str.split(/\s+/);
    const map = new Map<string, string>();
    const res = [];
    
    for(const word of words){
        const key = word.toLowerCase().replace(/[^0-9a-z]/g, "");
        if(!map.has(key)){
            map.set(key, word);
        }
    }
    
    /*for(const value of map.values()){
        res.push(value);
    }*/
    return Array.from(map.values()).join(" ");
}

console.log(rem("I am Peter and I am a Software Engineer"));
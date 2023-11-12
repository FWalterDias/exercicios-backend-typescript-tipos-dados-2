const fs = require("fs");

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync("./db.json"));
}

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync("./db.json", JSON.stringify(dados));
}

const dadosJson = lerArquivo() as string[];
dadosJson.push("Hobbinho");
escreverArquivo(dadosJson);

console.log(lerArquivo());
 
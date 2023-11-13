const fs = require("fs");

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync("./db.json"));
}

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync("./db.json", JSON.stringify(dados));
}

type EnderecoProps = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type UsuarioProps = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: EnderecoProps | null
}

const cadastrarUsuario = (dados: UsuarioProps): UsuarioProps => {
    const bd = lerArquivo() as UsuarioProps[];

    bd.push(dados);

    escreverArquivo(bd);

    return dados;
}

const listarUsuarios = (): UsuarioProps[] => {
    return lerArquivo() as UsuarioProps[];
}

const hobbinho = cadastrarUsuario({
    nome: "hobbinho",
    email: "hobbinho@gmail.com",
    cpf: "432653378894",
    endereco:{
        cep: "62031175",
        bairro: "Terrenos Novos",
        cidade: "Sobral",
        rua: "Luis santos aquino"
    }
});

const bd = lerArquivo();
console.log(bd, hobbinho);

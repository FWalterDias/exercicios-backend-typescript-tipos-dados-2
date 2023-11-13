const fs = require("fs");

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

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync("./db.json"));
}

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync("./db.json", JSON.stringify(dados));
}

const cadastrarUsuario = (dados: UsuarioProps): UsuarioProps => {
    const bd = lerArquivo() as UsuarioProps[];

    bd.push(dados);

    escreverArquivo(bd);

    return dados;
}

const listarUsuarios = (filtro?: string): UsuarioProps[] => {
    const bd = lerArquivo() as UsuarioProps[];

    const usuariosFiltrados: UsuarioProps[] = bd.filter(usuario => !filtro || usuario.profissao === filtro);

    return usuariosFiltrados;
}

const detalharUsuario = (cpf: string): UsuarioProps => {
    const bd = lerArquivo() as UsuarioProps[];

    const usuario = bd.find(usuario => usuario.cpf === cpf);

    if (!usuario) throw new Error("Usuário não encontrado!");


    return usuario;
}

const atualizarUsuario = (cpf: string, dados: UsuarioProps): UsuarioProps => {
    const bd = lerArquivo() as UsuarioProps[];

    const usuario = bd.find(usuario => usuario.cpf === cpf);

    if (!usuario) throw new Error("Usuário não encontrado!");

    Object.assign(usuario, dados);

    escreverArquivo(bd);

    return dados;
}

const excluirUsuario = (cpf: string): UsuarioProps => {
    const bd = lerArquivo() as UsuarioProps[];

    const usuario = bd.find(usuario => usuario.cpf === cpf);

    if (!usuario) throw new Error("Usuário não encontrado!");
    
    const listaAtualizada = bd.filter(usuario => usuario.cpf !== cpf);

    escreverArquivo(listaAtualizada);

    return usuario;
}

// cadastrarUsuario({
//     nome: "Maria",
//     email: "Maria@gmail.com",
//     cpf: "11122233344",
//     profissao: "UX/UI",
//     endereco:{
//         cep: "62031175",
//         bairro: "Terrenos Novos",
//         cidade: "Sobral",
//         rua: "Luis santos aquino"
//     }
// });

//detalharUsuario("432653378894");

// atualizarUsuario("07488846370", {
//     nome: "hobbinho marques silva",
//     email: "hobbinho@gmail.com",
//     cpf: "07488846370",
//     profissao: "Cantor",
//     endereco: {
//         cep: "62031175",
//         bairro: "Terrenos Novos",
//         cidade: "Sobral",
//         rua: "Luis santos aquino"
//     }
// });

//excluirUsuario("432653378894");

// console.log(listarUsuarios());
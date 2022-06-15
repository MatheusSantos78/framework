import { promises as fs } from "fs";

async function createFiles() {
    //funcao para puxar os estados
    let info = await fs.readFile("./Estados.json");
    const estados = JSON.parse(info);

    //funcao para puxar as cidades
    info = await fs.readFile("./Cidades.json");
    const cidades = JSON.parse(info);

    //funcao para puxar as siglas(UF) de cada estado
    for (var states of estados) {
        const estadoUF = cidades.filter(cidade => cidade.Estado == states.ID)
        await fs.writeFile(`./Estados/${states.Sigla}.json`, JSON.stringify(estadoUF))
    }

}

//funcao que retorna a quantidadde de cidades dos estados
async function contarCidades(uf) {

    let info = await fs.readFile(`./Estados/${uf}.json`);
    const cidades = JSON.parse(info);
    console.log(cidades.length);
}

//funcao para ordenar os estados em ordem crescente com mais cidades(5 maiores)
async function maisCidades() {
    const estados = JSON.parse(await fs.readFile("./Estados.json"));
    var contUF = [];

    for (var states of estados) {
        var contar = await fs.readFile(`./Estados/${states.Sigla}.json`);
        contar = JSON.parse(contar)
        contUF.push({ uf: states.Sigla, count: contar.length });
    }

    contUF.sort((a, b) => {
        if (a.count < b.count) return 1;
        else if (a.count > b.count) return -1;
        else return 0
    })

    contUF = contUF.splice(0, 5)
    console.log(contUF)
}

//funcao para mostrar as regioes, cidades e estados(UF)
async function ordemRegiao() {
    let info = await fs.readFile("./Estados.json");
    const estados = JSON.parse(info);

    info = await fs.readFile("./Cidades.json");
    const cidades = JSON.parse(info);

    info = await fs.readFile(`./capitais.json`)
    const capitais = JSON.parse(info)

    estados.forEach(element => {
        var regiaoAtual = null;
        var vetor = [];
        capitais.forEach(elemento => {
            if (element.Nome === elemento.Estado) {
                regiaoAtual = elemento.Região

            }

        })
        cidades.forEach(elemento => {
            if (elemento.Estado === element.ID) {
                vetor.push(elemento)
            }
        });
        fs.writeFile(`./Regioes/${regiaoAtual}/${element.Sigla}.json`, JSON.stringify(vetor, null, 2))
    });

}

createFiles()
contarCidades("DF")
maisCidades()
ordemRegiao()
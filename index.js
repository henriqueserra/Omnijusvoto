const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");

teste();

async function teste() {
  var registros = new Array();
  fs.createReadStream("VAINDUSTRIAL.txt")
    .pipe(csv())
    .on("data", (row) => {
      // console.log(row);
      registros.push(row);
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");
      const quantidaderegistros = registros.length;
      var indice = 0;
      do {
        registro = {
          mfn: registros[indice].MFN,
          nomedabase: registros[indice].NomedaBase,
          prefixo: registros[indice].Prefixo,
          nocaixa: registros[indice].NodaCaixa,
          atualizador: registros[indice].Atualizador,
          datadedigitacao: registros[indice].DatadeDigitacao,
          observacao1: registros[indice].Observacoes1,
          observacao2: registros[indice].Observacoes2,
          empresa1: registros[indice].Empresa1,
          empresa2: registros[indice].Empresa2,
          digitador: registros[indice].Digitador,
          ID: registros[indice].ID,
          descricao: registros[indice].Descricao,
          codigo: registros[indice].Codigo,
          periodo: registros[indice].Periodo,
          pendencia: registros[indice].Pendencia,
          tipo: registros[indice].Tipo,
          status: registros[indice].Status,
          fonte: registros[indice].Fonte,
          vigencia: registros[indice].Vigencia,
        };

        const resultado = await axios.post(
          "https://omnijus-votorantim.bubbleapps.io/version-test/api/1.1/obj/basebruta",
          registro
        );
        console.log(resultado.data.id + " criado");
        indice++;
        console.log("Restam => " + (quantidaderegistros - indice));
      } while (indice < quantidaderegistros);
    });
}

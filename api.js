const data = require('./valores.json')
const express = require('express')
const app = express()
const port = 5000 || 3000

function checarDadosInformados (res, req) {
    let cep = req.params.cep
    let peso = req.params.peso
    let isNumCEP = /^\d+$/.test(cep);
    let isNumPeso = /^\d+$/.test(peso);
    var found = false
    var deliveryData = null

    if(!isNumCEP) {  res.send('Insira o seu CEP (apenas números)') }
    else if(isNumCEP && cep.length < 5 || cep.length > 8) {  res.send('Insira um CEP válido, por gentileza')  }
    else if(isNumCEP && cep.length >= 5 && !isNumPeso) {  res.send('Insira o peso da sua embalagem em gramas (apenas números)')  }
    else if(isNumCEP && cep.length >= 5 && isNumPeso && peso <= 0) {  res.send('Não transportamos ar embalado, caro cliente')  }
    else if(isNumCEP && cep.length >= 5 && isNumPeso && peso > 0) { //CEP e peso têm valores válidos
        
        for (let i = 0; i < data.length; i++) {
            var inicio = parseInt(data[i]['CEP INICIAL'].replace("-", ""))
            var fim = parseInt(data[i]['CEP FINAL'].replace("-", ""))
            for (let index = inicio; index <= fim; index++) {
                if(index == cep) {
                    found = true
                    deliveryData = data[i]
                    break
                }
            }   
        }
    }  
    return [found, deliveryData, peso]
}

function calcularPreço(deliveryData, peso) {
    const gris = parseFloat(deliveryData.GRIS)/100
    const preco = parseFloat(deliveryData['PREÇO'].replace("R$ ", "").replace(",", "."))
    const advalorem = parseFloat(deliveryData['ADVALOREM'])/100
    const prazo = deliveryData['PRAZO (em dias)']
    const result = (gris * preco) + (advalorem * preco) + (peso*0.005)
    return [result, prazo]
}

app.get('/', (req, res) => {  res.redirect('/api/v1/calculo-frete')  })
app.get('/api/v1/calculo-frete', (req, res) => {  res.send(`Especifique seu CEP e peso em gramas no url! (http://localhost:${port}/api/v1/calculo-frete/seu-cep/peso-da-embalagem)`)  })
app.get('/api/v1/calculo-frete/:cep', (req, res) => {  res.send(`Especifique o peso da embalagem no url (http://localhost:${port}/api/v1/calculo-frete/${req.params.cep}/peso-da-embalagem)`)  })

app.get('/api/v1/calculo-frete/:cep/:peso', (req, res) => {
    const [found, deliveryData, peso] = checarDadosInformados (res, req)
    if(!found && !res.writableEnded) {  res.send('Infelizmente ainda não entregamos na sua localização... ☹️')  }
    else if (found) { //calcular o valor final
        const [finalResult, prazo] = calcularPreço(deliveryData, peso)
        res.send({
            'Preço final (em R$)': finalResult,
            'Previsão de entrega: ': `${prazo} dias úteis`
        })
    }
})

app.listen(port, () => { console.log(`API listening on port ${port}`) })
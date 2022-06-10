import { Request, Response } from 'express'
import puppeteer, { HTTPRequest, HTTPResponse } from 'puppeteer'


export const searchVeiculos = (req: Request, response: Response) => {
    let url = "https://veiculos.fipe.org.br/"
    let google = "https://www.google.com.br/"
    let option: string[]  = ['']
    let option3: string[]  = ['']
    let option5: string[]  = ['']
    // const list : string[] = ['']    
    // let option6: string[]  = ['']
    let formSelectModel = false
    let formSelectAnoCar = false
    let anunciosSelects = false

    let dados = req.body.select
    let marcaVeiculo = req.body.select1
    let modeloVeiculo = req.body.select2
    let anoVeiculo = req.body.select3

    let mesReferencia = ''
    let codigoFipe = ''
    let marca = ''
    let modelo = ''
    let anoModelo = ''
    let autenficacao = ''
    let dataConsulta = ''
    let precoMedio = ''
    
    if(dados) {
     ;(async () => {
        const list = []
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(url,{ timeout: 0});
        
        await page.waitForSelector('[data-slug="carro"]')
        if(dados == 'Consulta de Carros e utilitários pequenos') {
            await page.click('[data-label="carro"]')
            await page.waitForSelector('#selectMarcacarro')
            let arrayOption =  await page.$$eval('#selectMarcacarro option', item => item.map(opt => opt.innerHTML))
            let arrayOption2 =  await page.$$eval('#selectMarcacarro option', item => item.map(opt => opt.getAttribute('value')))
            const option = [...arrayOption]
            const option2 = [...arrayOption2]
            option[0] == '' ? option.shift() : option
            option2[0] == '' ? option2.shift() : option2
            
            if(marcaVeiculo)  {
               
                let number = option.indexOf(marcaVeiculo)
                let veiculo = option2[number]
               
                await page.waitForSelector('.input')
                await page.waitForSelector('#selectMarcacarro')
                
                await page.select('select#selectMarcacarro', veiculo!)
                let arrayOption3 =  await page.$$eval('#selectAnoModelocarro option', item => item.map(opt => opt.innerHTML))
                let arrayOption4 =  await page.$$eval('#selectAnoModelocarro option', item => item.map(opt => opt.getAttribute('value')))
                option3 = [...arrayOption3]
                option3[0] == '' ? option3.shift() : option3
                const option4 = [...arrayOption4]
                option4[0] == '' ? option4.shift() : option4

                formSelectModel = true
            }
            if(modeloVeiculo){

                let arrayOption5 =  await page.$$eval('#selectAnoModelocarro option', item => item.map(opt => opt.getAttribute('value')))
                let option4 = [...arrayOption5]
                option4[0] == '' ? option4.shift() : option4
                let number2 = option3.indexOf(modeloVeiculo)
                let veiculo2 = option4[number2]
            
                await page.waitForSelector('#selectAnoModelocarro')
                await page.select('select#selectAnoModelocarro', veiculo2!)
                formSelectAnoCar = true

                let arrayOption6 =  await page.$$eval('#selectAnocarro option', item => item.map(opt => opt.innerHTML))
                let arrayOption7 =  await page.$$eval('#selectAnocarro option', item => item.map(opt => opt.getAttribute('value')))
                option5 = [...arrayOption6]
                let option6 = [...arrayOption7]
                option5[0] == '' ? option5.shift() : option5
                option6[0] == '' ? option6.shift() : option6
            }
            
            if(anoVeiculo){
                let arrayOption6 =  await page.$$eval('#selectAnocarro option', item => item.map(opt => opt.innerHTML))
                let arrayOption7 =  await page.$$eval('#selectAnocarro option', item => item.map(opt => opt.getAttribute('value')))
                option5 = [...arrayOption6]
                const option6 = [...arrayOption7]
                option5[0] == '' ? option5.shift() : option5
                option6[0] == '' ? option6.shift() : option6

                let number2 = option5.indexOf(anoVeiculo)
                let veiculo3 = option6[number2]
                await page.waitForSelector('#selectAnocarro')
                await page.select('select#selectAnocarro', veiculo3!)

                await page.click('#buttonPesquisarcarro')

                await page.waitForSelector('#resultadoConsultacarroFiltros .last')

                let arrayValues =  await page.$$eval('#resultadoConsultacarroFiltros tbody td p', item => item.map(opt => opt.innerHTML))

                mesReferencia = arrayValues[1]
                codigoFipe = arrayValues[3]
                marca = arrayValues[5]
                modelo = arrayValues[7]
                anoModelo = arrayValues[9]
                autenficacao = arrayValues[11]
                dataConsulta = arrayValues[13]
                precoMedio = arrayValues[15]

                await page.goto(google,{ timeout: 0});
                await page.waitForSelector('.gLFyf')
                await page.type('.gLFyf.gsfi', `comprar ${modelo} ${anoModelo}`)
                await page.keyboard.press('Enter')
                await page.waitForSelector('.yuRUbf')
        
                let links2 =  await page.$$eval('.yuRUbf a', item => item.map((link: any) => { return link.href }))
                
                for(const item of links2 ){
                    
                    if(item.indexOf('lista.mercadolivre.com.br') > -1 ){
                        
                        await page.goto(item,{ timeout: 0})
                        await page.waitForSelector('.ui-search-result__image')
                        let linksML = await page.$$eval('.ui-search-result__image a', item => item.map((link: any) => { return link.href }))
                        let i = 1
                        for (let link of linksML) {
                            
                            if(i === 6) continue
                            await page.goto(link,{ timeout: 0})
                            let imgML = await page.$$eval('.ui-pdp-gallery__figure__image',  item => item.map((link: any) => { return link.src }))
                            let titleML = await page.$eval('.ui-pdp-title', (item: any) => item.innerText)
                            let anoEKmVeiculo = await page.$eval('.ui-pdp-subtitle', (item: any) => item.innerText)
                            let precoVeiculow = await page.$eval('.andes-money-amount__fraction', (item: any) => item.innerText)
                            const objML = {
                                title : titleML,
                                img: imgML[0],
                                anoEKmVeiculo,
                                precoVeiculow,
                                link
                            }
                            list.push(objML)
                            if(list.length > 0){
                                anunciosSelects = true
                            }
                            
                            i++
                        }
                        
                       
                    }
                    
                }
                console.log(list)
                console.log(links2)

            }
            await browser.close();
            response.render('pages/home', {
                option,
                option2: option3,
                option3: option5,
                formSelect: true,
                formSelectModel,
                formSelectAnoCar,
                carro: true,
                marcaVeiculo,
                modeloVeiculo,
                anoVeiculo,
                mesReferencia,
                codigoFipe,
                marca,
                modelo,
                anoModelo,
                autenficacao,
                dataConsulta,
                precoMedio,
                anunciosSelects,
                anuncio1: list[0],
                anuncio2: list[1],
                anuncio3: list[2],
                anuncio4: list[3],
                anuncio5: list[4],
            })
            
            
        }

        if(dados == 'Consulta de Caminhões e Micro-Ônibus') {
            await page.click('[data-label="caminhao"]')
            await page.waitForSelector('#selectMarcacaminhao')
            let arrayOption =  await page.$$eval('#selectMarcacaminhao option', item => item.map(opt => opt.innerHTML))
            let arrayOption2 =  await page.$$eval('#selectMarcacaminhao option', item => item.map(opt => opt.getAttribute('value')))
            const option = [...arrayOption]
            const option2 = [...arrayOption2]
            option[0] == '' ? option.shift() : option
            option2[0] == '' ? option2.shift() : option2

            if(marcaVeiculo)  {
               
                let number = option.indexOf(marcaVeiculo)
                let veiculo = option2[number]
               
                await page.waitForSelector('.input')
                await page.waitForSelector('#selectMarcacaminhao')
                
                await page.select('select#selectMarcacaminhao', veiculo!)
                let arrayOption3 =  await page.$$eval('#selectAnoModelocaminhao option', item => item.map(opt => opt.innerHTML))
                let arrayOption4 =  await page.$$eval('#selectAnoModelocaminhao option', item => item.map(opt => opt.getAttribute('value')))
                option3 = [...arrayOption3]
                option3[0] == '' ? option3.shift() : option3
                const option4 = [...arrayOption4]
                option4[0] == '' ? option4.shift() : option4

                formSelectModel = true
            }
            if(modeloVeiculo){

                let arrayOption5 =  await page.$$eval('#selectAnoModelocaminhao option', item => item.map(opt => opt.getAttribute('value')))
                let option4 = [...arrayOption5]
                option4[0] == '' ? option4.shift() : option4
                let number2 = option3.indexOf(modeloVeiculo)
                let veiculo2 = option4[number2]
            
                await page.waitForSelector('#selectAnoModelocaminhao')
                await page.select('select#selectAnoModelocaminhao', veiculo2!)
                formSelectAnoCar = true

                let arrayOption6 =  await page.$$eval('#selectAnocaminhao option', item => item.map(opt => opt.innerHTML))
                let arrayOption7 =  await page.$$eval('#selectAnocaminhao option', item => item.map(opt => opt.getAttribute('value')))
                option5 = [...arrayOption6]
                let option6 = [...arrayOption7]
                option5[0] == '' ? option5.shift() : option5
                option6[0] == '' ? option6.shift() : option6
            }
            if(anoVeiculo){
                let arrayOption6 =  await page.$$eval('#selectAnocaminhao option', item => item.map(opt => opt.innerHTML))
                let arrayOption7 =  await page.$$eval('#selectAnocaminhao option', item => item.map(opt => opt.getAttribute('value')))
                option5 = [...arrayOption6]
                const option6 = [...arrayOption7]
                option5[0] == '' ? option5.shift() : option5
                option6[0] == '' ? option6.shift() : option6

                let number2 = option5.indexOf(anoVeiculo)
                let veiculo3 = option6[number2]
                await page.waitForSelector('#selectAnocaminhao')
                await page.select('select#selectAnocaminhao', veiculo3!)

                await page.click('#buttonPesquisarcaminhao')

                await page.waitForSelector('#resultadoConsultacaminhaoFiltros .last')

                let arrayValues =  await page.$$eval('#resultadoConsultacaminhaoFiltros tbody td p', item => item.map(opt => opt.innerHTML))

                mesReferencia = arrayValues[1]
                codigoFipe = arrayValues[3]
                marca = arrayValues[5]
                modelo = arrayValues[7]
                anoModelo = arrayValues[9]
                autenficacao = arrayValues[11]
                dataConsulta = arrayValues[13]
                precoMedio = arrayValues[15]

                await page.goto(google,{ timeout: 0});
                await page.waitForSelector('.gLFyf')
                await page.type('.gLFyf.gsfi', `comprar ${modelo} ${anoModelo}`)
                await page.keyboard.press('Enter')
                await page.waitForSelector('.yuRUbf')
        
                let links2 =  await page.$$eval('.yuRUbf a', item => item.map((link: any) => { return link.href }))
                
                for(const item of links2 ){
                    
                    if(item.indexOf('lista.mercadolivre.com.br') > -1 ){
                        await page.goto(item,{ timeout: 0})
                        await page.waitForSelector('.ui-search-result__image')
                        let linksML = await page.$$eval('.ui-search-result__image a', item => item.map((link: any) => { return link.href }))
                        let i = 1
                        for (let link of linksML) {
                            if(i === 6) continue
                            await page.goto(link,{ timeout: 0})
                            let imgML = await page.$$eval('.ui-pdp-gallery__figure__image',  item => item.map((link: any) => { return link.src }))
                            let titleML = await page.$eval('.ui-pdp-title', (item: any) => item.innerText)
                            let anoEKmVeiculo = await page.$eval('.ui-pdp-subtitle', (item: any) => item.innerText)
                            let precoVeiculow = await page.$eval('.andes-money-amount__fraction', (item: any) => item.innerText)
                            const objML = {
                                title : titleML,
                                img: imgML[0],
                                anoEKmVeiculo,
                                precoVeiculow,
                                link
                            }
                            list.push(objML)
                            if(list.length > 0){
                                anunciosSelects = true
                            }
                            i++
                        }
                        
                       
                    }
                    
                }

                console.log(list)
                console.log(links2)
            }
            

            await browser.close();
            response.render('pages/home', {
                formSelect: true,
                caminhao: true,
                option,
                option2: option3,
                option3: option5,
                formSelectModel,
                formSelectAnoCar,
                marcaVeiculo,
                modeloVeiculo,
                anoVeiculo,
                mesReferencia,
                codigoFipe,
                marca,
                modelo,
                anoModelo,
                autenficacao,
                dataConsulta,
                precoMedio,
                anunciosSelects,
                anuncio1: list[0],
                anuncio2: list[1],
                anuncio3: list[2],
                anuncio4: list[3],
                anuncio5: list[4],
            }
        )}

        if(dados == 'Consulta de motos') {
            await page.click('[data-label="moto"]')
            await page.waitForSelector('#selectMarcamoto')
            let arrayOption =  await page.$$eval('#selectMarcamoto option', item => item.map(opt => opt.innerHTML))
            let arrayOption2 =  await page.$$eval('#selectMarcamoto option', item => item.map(opt => opt.getAttribute('value')))
            const option = [...arrayOption]
            const option2 = [...arrayOption2]
            option[0] == '' ? option.shift() : option
            option2[0] == '' ? option2.shift() : option2

            if(marcaVeiculo)  {
               
                let number = option.indexOf(marcaVeiculo)
                let veiculo = option2[number]
               
                await page.waitForSelector('.input')
                await page.waitForSelector('#selectMarcamoto')
                
                await page.select('select#selectMarcamoto', veiculo!)
                let arrayOption3 =  await page.$$eval('#selectAnoModelomoto option', item => item.map(opt => opt.innerHTML))
                let arrayOption4 =  await page.$$eval('#selectAnoModelomoto option', item => item.map(opt => opt.getAttribute('value')))
                option3 = [...arrayOption3]
                option3[0] == '' ? option3.shift() : option3
                const option4 = [...arrayOption4]
                option4[0] == '' ? option4.shift() : option4

                formSelectModel = true
            }
            if(modeloVeiculo){

                let arrayOption5 =  await page.$$eval('#selectAnoModelomoto option', item => item.map(opt => opt.getAttribute('value')))
                let option4 = [...arrayOption5]
                option4[0] == '' ? option4.shift() : option4
                let number2 = option3.indexOf(modeloVeiculo)
                let veiculo2 = option4[number2]
            
                await page.waitForSelector('#selectAnoModelomoto')
                await page.select('select#selectAnoModelomoto', veiculo2!)
                formSelectAnoCar = true

                let arrayOption6 =  await page.$$eval('#selectAnomoto option', item => item.map(opt => opt.innerHTML))
                let arrayOption7 =  await page.$$eval('#selectAnomoto option', item => item.map(opt => opt.getAttribute('value')))
                option5 = [...arrayOption6]
                let option6 = [...arrayOption7]
                option5[0] == '' ? option5.shift() : option5
                option6[0] == '' ? option6.shift() : option6
            }
        
            if(anoVeiculo){
                let arrayOption6 =  await page.$$eval('#selectAnomoto option', item => item.map(opt => opt.innerHTML))
                let arrayOption7 =  await page.$$eval('#selectAnomoto option', item => item.map(opt => opt.getAttribute('value')))
                option5 = [...arrayOption6]
                const option6 = [...arrayOption7]
                option5[0] == '' ? option5.shift() : option5
                option6[0] == '' ? option6.shift() : option6

                let number2 = option5.indexOf(anoVeiculo)
                let veiculo3 = option6[number2]
                await page.waitForSelector('#selectAnomoto')
                await page.select('select#selectAnomoto', veiculo3!)

                await page.click('#buttonPesquisarmoto')

                await page.waitForSelector('#resultadoConsultamotoFiltros .last')

                let arrayValues =  await page.$$eval('#resultadoConsultamotoFiltros tbody td p', item => item.map(opt => opt.innerHTML))

                mesReferencia = arrayValues[1]
                codigoFipe = arrayValues[3]
                marca = arrayValues[5]
                modelo = arrayValues[7]
                anoModelo = arrayValues[9]
                autenficacao = arrayValues[11]
                dataConsulta = arrayValues[13]
                precoMedio = arrayValues[15]

                await page.goto(google,{ timeout: 0});
                await page.waitForSelector('.gLFyf')
                await page.type('.gLFyf.gsfi', `comprar ${modelo} ${anoModelo}`)
                await page.keyboard.press('Enter')
                await page.waitForSelector('.yuRUbf')
        
                let links2 =  await page.$$eval('.yuRUbf a', item => item.map((link: any) => { return link.href }))
                
                for(const item of links2 ){
                    
                    if(item.indexOf('lista.mercadolivre.com.br') > -1 ){
                        await page.goto(item,{ timeout: 0})
                        await page.waitForSelector('.ui-search-result__image')
                        let linksML = await page.$$eval('.ui-search-result__image a', item => item.map((link: any) => { return link.href }))
                        let i = 1
                        for (let link of linksML) {
                            if(i === 6) continue
                            await page.goto(link,{ timeout: 0})
                            let imgML = await page.$$eval('.ui-pdp-gallery__figure__image',  item => item.map((link: any) => { return link.src }))
                            let titleML = await page.$eval('.ui-pdp-title', (item: any) => item.innerText)
                            let anoEKmVeiculo = await page.$eval('.ui-pdp-subtitle', (item: any) => item.innerText)
                            let precoVeiculow = await page.$eval('.andes-money-amount__fraction', (item: any) => item.innerText)
                            const objML = {
                                title : titleML,
                                img: imgML[0],
                                anoEKmVeiculo,
                                precoVeiculow,
                                link
                            }
                            list.push(objML)
                            if(list.length > 0){
                                anunciosSelects = true
                            }
                            i++
                        }
                        
                       
                    }
                    
                }

                console.log(list)
                console.log(links2)
                

            }

            await browser.close();
            response.render('pages/home', {
                option,
                formSelect: true,
                moto: true,
                option2: option3,
                option3: option5,
                formSelectModel,
                formSelectAnoCar,
                marcaVeiculo,
                modeloVeiculo,
                anoVeiculo,
                mesReferencia,
                codigoFipe,
                marca,
                modelo,
                anoModelo,
                autenficacao,
                dataConsulta,
                precoMedio,
                anunciosSelects,
                anuncio1: list[0],
                anuncio2: list[1],
                anuncio3: list[2],
                anuncio4: list[3],
                anuncio5: list[4],
            }
        )}
        
      })();

    }

    
    
}
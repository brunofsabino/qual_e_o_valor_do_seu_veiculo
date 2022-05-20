import { Request, Response } from 'express'
import puppeteer from 'puppeteer'


export const searchVeiculos = (req: Request, response: Response) => {
    let url = "https://veiculos.fipe.org.br/"
    let option  = ['']
    let dados = req.body.select
    if(dados == 1) {
       
    

     ;(async () => {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(url,{ timeout: 0});
        
        await page.waitForSelector('[data-slug="carro"]')
        if(dados == 1) {
            await page.click('[data-slug="carro"]')
            console.log("CLIQUEI")

            await page.waitForSelector('#selectMarcacarro')
            let arrayOption =  await page.$$eval('#selectMarcacarro option', item => item.map(opt => opt.innerHTML))
            option = [...arrayOption]
            console.log(option)
            await page.evaluate( ()=> {
                // let item =  document.querySelectorAll('.ilustra')
                // let arrayClique = [...item]
                
                console.log('entrei')
            
                let a = document.querySelectorAll('#selectMarcacarro option')
                let array = [... a]
                // for( let item in array){
                //     item
                // }
                console.log(array)
                return array
                
            })
            // res.render('pages/home', {
            //     option
            // })
            response.render('pages/search', {
                option
            })
        }
      
        // await browser.close();
      })();

    }

    
    
}
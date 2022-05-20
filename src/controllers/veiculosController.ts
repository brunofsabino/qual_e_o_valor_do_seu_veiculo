import { Request, Response } from 'express'
import puppeteer from 'puppeteer'


export const home = (req: Request, res: Response) => {
   
    res.render('pages/home', {
        
    })
    
}


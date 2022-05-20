import { Router } from 'express'
import * as veiculosController from '../controllers/veiculosController'
import * as searchController from '../controllers/searchController'

const router = Router()

router.get('/', veiculosController.home)

router.post('/search', searchController.searchVeiculos)


export default router
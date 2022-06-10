import { Router } from 'express'
import * as veiculosController from '../controllers/veiculosController'
import * as searchController from '../controllers/searchController'

const router = Router()

router.get('/', veiculosController.home)

router.post('/', searchController.searchVeiculos)


export default router
import { Router } from 'express'
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favorite.controller'
import { protect } from '../middlewares/auth.middleware'

const router = Router() // todas protegidas, usuario logueado

router.post('/', protect(), addFavorite)       // agregar favorito
router.get('/', protect(), getFavorites)       // obtener favoritos del usuario
router.delete('/:productId', protect(), removeFavorite) // eliminar favorito por productId

export default router

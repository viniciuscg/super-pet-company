import Route from '@ioc:Adonis/Core/Route'

Route.get('/breeds', 'BreedsController.index')
Route.get('/users', 'UsersController.index')
Route.get('/user/:id', 'UsersController.getUser')
Route.get('/pet', 'PetsController.index')
Route.get('/pet/user/:userId', 'PetsController.getPets')
Route.post('/pet/user/:userId', 'PetsController.resgisterPet')
Route.put('/pet/edit/:id', 'PetsController.editPet')
Route.post('/login', 'UsersController.loginUser')
Route.post('/Register', 'UsersController.resgisterUser')

const AuthService = require('../services/auth.service');
const UsersService = require('../services/users.service');
const dotenv = require('dotenv')

dotenv.config();
const authService = new AuthService();
const usersService = new UsersService();



const signUp = async (request, response, next) => {
    const { email, password } = request.body
    try {
        const user = await authService.checkUsersCredentials(email, password)
        // if (user) {
        //     const token = jwt.sign({
        //         id: user.id,
        //         email: user.email,
        //         role: user.role
        //     }, jwtSecret)

        //     res.status(200).json({
        //         message: 'Correct Credentials!',
        //         token
        //     })
        // } else {
        //     res.status(401).json({ message: 'Invalid Credentials' })
        // }
        response.status(200).json({message: user})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signUp
}
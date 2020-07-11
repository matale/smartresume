import * as userRepositories from '../repositories/userRepositories.js';
import * as encryptUtilities from '../shared/utils/encryptUtilities';
import * as jwtUtilities from '../shared/utils/jsonWebTokenUtilities';
import CustomException from '../shared/models/CustomException';
import * as errorMessage from '../shared/constants/messages';
import AuthenticatedUser from '../dto/AuthenticatedUser';

export const register = async (user) => {
    try {
        if (user.password !== user.confirmedPassword) {
            throw new CustomException(true, errorMessage.PASSWORD_CONFIRMEDPASSWORD_MISMATCHED);
        }

        user.password = encryptUtilities.encrypt(user.password);

        return await userRepositories.register(user);
    } catch (err) {
        throw err;
    }

}

export const login = async (username, password) => {
    try {
        let createdUser = await userRepositories.login(username, password);

        if (!createdUser) throw new CustomException(true, errorMessage.INVALID_USERNAME_PASSWORD);

        if (!createdUser.comparePassword(password, createdUser.password)) throw new CustomException(true, errorMessage.INVALID_USERNAME_PASSWORD);

        let access_token = await jwtUtilities.createToken(username, createdUser.id, createdUser.role);

        return await new AuthenticatedUser(username, access_token, createdUser.role);
    } catch (err) {
        throw err;
    }
}

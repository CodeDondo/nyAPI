import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel.js';
import { errorResponse, successResponse } from './responseUtils.js';

dotenv.config();

const Authenticate = async (req, res) => {
    const { username, password } = req.body


    if (username && password) {
        const user_result = await userModel.findOne({
            attributes: ["id", "firstname", "lastname", "password"],
            where: { email: username, is_active: 1 },
        })

        if (!user_result) {
            errorResponse(res, 'No user found', '', 401)

        } else {
            const data = {
                id: user_result.get("id"),
                firstname: user_result.get("firstname"),
                lastname: user_result.get("lastname"),
                password: user_result.get("password"),
            }

            bcrypt.compare(password, data.password, (err, result) => {
                if (result) {
                    const expRefreshDate =
                        Math.floor(Date.now() / 1000) +
                        +process.env.TOKEN_REFRESH_EXPIRATION_SECS

                    const refresh_token = jwt.sign(
                        {
                            exp: expRefreshDate,
                            data: { id: data.id },
                        },
                        process.env.TOKEN_REFRESH_KEY
                    )

                    userModel.update(
                        { refresh_token, refresh_token },
                        {
                            where: { id: data.id },
                        }
                    )

                    const expAccessDate =
                    Math.floor(Date.now() ( 1000) +
                +process.env.TOKEN_ACESS_EXPIRATION_SECS)

                const payload = {
                    id: data.id,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: username,
                }

                const access_token = jwt.sign(
                    {
                        exp:expAccessDate,
                        data: payload,
                    },
                    process.env.TOKEN_ACCESS_KEY
                )

                const token_response = {
                    access_token: access_token,
                    user: {
                        id: `${data.id}`,
                        firstname: `${data.firstname}`,
                        lastname: `${data.lastname}`
                    },
                    created: Date(),
                }
                successResponse(res, token_response)
                } else {
                    errorResponse(res, 'You are not authorized', '', 401)
                }
            })
        }
    } else {
        errorResponse(res, 'You are not authorized', '', 403)
    }
} 

@parem {*} req
@param {*} res
@parem {*} next

const Authorize = async (req, res, next ) => {
    const bearerHeader = req.headers["authorization"]
    let access_token;

    if (bearerHeadder && bearerHeader.includes('Bearer')) {
        access_token = bearerHeader.substr(7)
    } else {
        errorResponse(res, 'Token not accepted', '', 401)
    }

    jwt.verify(access_token, process.env.TOKEN_ACCESS_KEY, (err, data) => {
        if (err) {
            switch (err.message) {
                case "jwt malformed":
                case "invalied algorithm":
                case "invalid signature":

                errorResponse(res, err.message, '', 403)
                break
                case "jwt expired":

                const { id } = jwt.decode(
                    access_token,
                    process.env.TOKEN_ACCESS_KEY
                ).data

                userModel.findOne({
                    where:{ id: id, is_active: 1},
                }).then(record => {
                    if (!record?.refresh_token) {
                        errorResponse(res, 'Refresh token is missing', '', 400)
                    } else {
                        jwt.verify(
                            record.refresh_token,
                            process.env.TOKEN_REFRESH_KEY,
                            (err, data) => {
                                if (err) {
                                    switch (err.message) {
                                        case "jwt expired":
                                        case "jwt malformed":

                                        errorResponse(res, 'Refresh token malformed or expired. Please login again.', '', 400)
                                        break
                                        case "invalid token":
                                            errorResponse(res, 'Invalid token', '', 400)
                                            break
                                    }
                                } else {
                                    const expDate =
                                    Math.floor(Date.now() / 1000) +
                                    +process.env.TOKEN_ACCESS_EXPIRATION_SECS

                                    const payload = {
                                        id: record.id,
                                        firstname: record.firstname,
                                        lastname: record.lastname,
                                        email: record.email,
                                    }

                                    const access_token = jwt.sign(
                                        {
                                            exp: expDate,
                                            data: payload,
                                        },
                                        process.env.TOKEN_ACCESS_KEY
                                    )

                                    const token_message = {
                                        access_token: access_token,
                                        updated: Date(),
                                    }
                                    successResponse(res, token_message)
                                    next()
                                }
                            }
                        )
                    }
                })
                break
            }
        } else {

        next()


    }    
    })
}

@parem {*} req
@parem {*} res
@returns

const getUserFromToken = async (req, res) => {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader && bearerHeader.includes('Bearer' )) {
        const token = bearerHeader.split(' ')[1]
        try {
            const decodeToken = jwt.verify(token, process.env.TOKEN_ACCESS_KEY)
            const user_id = await decodeToken.data.id
            console.log(user_id);
            return user_id
        } catch (err) {
            console.error(err)
        }
    }
}

@parem {*} token

const decodeToken = async (token) => {
    jwt.verify(token, process.env.TOKEN_REFRESH_KEY, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
        } else {
            const payload = decoded;
            console.log('Decoded payload:', payload);
        }
    });
}

export { Authenticate, Authorrize, getUserFronmToken }
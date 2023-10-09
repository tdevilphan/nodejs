import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { StatusCode, VerifyTokenStatus } from '@app/common/constant'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  // Bypass login/register

  if (
    req.url.toLowerCase().trim() === '/user/login' ||
    req.url.toLowerCase().trim() === '/user/register' ||
    req.url.toLowerCase().trim() === '/'
  ) {
    next()
    return
  }
  // Get and validate token
  const token = req.headers?.authorization?.split(' ')[1]
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_TOKEN) as JwtPayload
    const isExpired = Date.now() >= jwtObject.exp * 1000
    if (isExpired) {
      return res.status(StatusCode.BAD_REQUEST).json({ message: VerifyTokenStatus.TOKEN_EXPIRED })
    } else {
      next()
    }
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).json({
      message: error.message
    })
  }
}

export default checkToken

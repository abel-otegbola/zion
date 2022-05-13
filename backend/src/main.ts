import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { AuthService } from './modules/auth/auth.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

const PUBLIC_URLS = [
  // '/api/trustedNft/verifyMintAddress',
  // '/api/whitelist/joinWhitelist',
  // '/api/auth/twitter/oauth/request_token',
  // '/api/auth/twitter/oauth/access_token',
  // '/api/auth/twitter/users/profile_banner',
  // '/api/auth/twitter/logout',
  '/api/auth/getNonce',
  '/api/auth/verify',
]

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('/api')
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
​
  // check authentication
  app.use(checkToken)
​
  // const config = new DocumentBuilder()
  //   .setTitle('NFT APIs')
  //   .setDescription('Apis description')
  //   .setVersion('1.0')
  //   .addTag('nft')
  //   .build()
  // const document = SwaggerModule.createDocument(app, config)
  // SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.PORT)
  console.log('Server started on : ', process.env.PORT)
}

bootstrap();

const checkToken = (req, res, next) => {
  // if url is public then pass
  const isPublic = PUBLIC_URLS.find((url) => req.path.startsWith(url))

  if (isPublic) {
    next()
  } else {
    const token = req.headers.token
    // const token = req.cookies.token
    // console.debug(`token`, token, `req.headers:`, req.headers, `req.cookies:`, req.cookies)
    if (!token || !token.length) {
      return res.status(401).json({ error: 'Not authenticated.' })
    }

    try {
      // set the jwt in the current execution context's request
      req.jwt = new AuthService(null).decodeToken(token)
      // console.debug(`req.jwt`, req.jwt)
      next()
    } catch (err) {
      console.error('User token verification error:', req.path, err)
      return res.status(401).json({ error: 'Not authenticated.' })
    }
  }
}

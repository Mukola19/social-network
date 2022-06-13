import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { TransformInterceptor } from './interceptors/transform.interceptor'

async function start() {
  const PORT = process.env.PORT || 5000

  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.enableCors({ origin: 'http://localhost:3000', credentials: true })
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new TransformInterceptor())

  const config = new DocumentBuilder()
    .setTitle('Social Network')
    .setDescription('The network API description')
    .setVersion('1.0')
    .addTag('social-network')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}
start()

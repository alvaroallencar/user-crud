import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle("Users CRUD")
    .setDescription("API created for Jala Soft Dev test.")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    customSiteTitle: "Swagger - CRUD",
    swaggerOptions: {
      docExpansion: "none",
    },
  });

  await app.listen(process.env.PORT || 3333);
}
bootstrap();

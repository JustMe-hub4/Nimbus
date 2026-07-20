"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./shared/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new http_exception_filter_1.GlobalExceptionFilter());
    await app.listen(3000);
    console.log(`Application is running on: http://localhost:3000/api/v1`);
}
bootstrap();
//# sourceMappingURL=main.js.map
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    private validateInput(envConfig: EnvConfig) {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production')
                .default('development'),
            PORT: Joi.number().default(3000),
            UFLIXIT_API_KEY: Joi.string().required(),
            DATABASE_USER: Joi.string()
                .default('postgres'),
            DATABASE_PASSWORD: Joi.string()
                .default('root'),
            DATABASE_NAME: Joi.string()
                .default('tvwebapp'),
        });

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }

        return validatedEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    get getApiKey(): string {
        return String(this.envConfig.UFLIXIT_API_KEY);
    }
}

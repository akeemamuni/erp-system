import { PublicDataSource } from './public.source';
import { defaultSchema } from './tenant.source';

// Create a default schema
// Use to generate tenant specific migrations
async function prepareExampleSchema() {
    console.log(`Schema "${defaultSchema}" preparation script started...`);
    const dataSource = PublicDataSource;

    try {
        await dataSource.initialize();
        const queryRunner = dataSource.createQueryRunner();

        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${defaultSchema}"`);
        await queryRunner.release();

    } catch (error) {
        console.error(`Error during "${defaultSchema}" preparation:`, error);
        process.exit(1);

    } finally {
        if (dataSource && dataSource.isInitialized) await dataSource.destroy();
    }

    console.log(`Schema "${defaultSchema}" preparation script finished...`);
}

prepareExampleSchema();

package ru.dmitry.sieg.logic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.entity.PoolParams;
import ru.dmitry.sieg.logic.generator.*;

@Component
public class PoolGenerator {

    private static final Logger logger = LoggerFactory.getLogger(PoolGenerator.class);

    @Autowired
    private GeneratorManager generatorManager;

    public Pool generate(final PoolParams poolParams) {

        logger.debug("generate(): {}", poolParams);

        final Pool pool = new Pool(poolParams);

        final Generator generator = new FilteringGenerator(10);
        generator.init(poolParams);
        generatorManager.generate(pool, generator);
        return pool;
    }
}

package ru.dmitry.sieg.logic.generator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import ru.dmitry.sieg.entity.Pool;

@Component
public class GeneratorManager {

    private static final Logger logger = LoggerFactory.getLogger(GeneratorManager.class);

    public void generate(final Pool pool, final Generator generator) {

        logger.debug("generate(): generator={}", generator);

        if (pool.isHasWater()) {
            pool.cleanup();
        }

        pool.iterateAndSetPoolHeight(generator);
    }
}

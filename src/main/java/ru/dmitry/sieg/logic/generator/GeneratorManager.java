package ru.dmitry.sieg.logic.generator;

import org.springframework.stereotype.Component;
import ru.dmitry.sieg.entity.Pool;

@Component
public class GeneratorManager {

    public void generate(final Pool pool, final Generator generator) {
        if (pool.isHasWater()) {
            pool.cleanup();
        }

        pool.iterateAndSetPoolHeight(generator);
    }
}

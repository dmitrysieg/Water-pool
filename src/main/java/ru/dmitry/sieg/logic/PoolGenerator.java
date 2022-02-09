package ru.dmitry.sieg.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.entity.PoolParams;
import ru.dmitry.sieg.logic.generator.FilteringGenerator;
import ru.dmitry.sieg.logic.generator.Generator;
import ru.dmitry.sieg.logic.generator.GeneratorManager;
import ru.dmitry.sieg.logic.generator.StandardGenerator;

@Component
public class PoolGenerator {

    @Autowired
    private GeneratorManager generatorManager;

    public Pool generate(final PoolParams poolParams) {
        final Pool pool = new Pool(poolParams);


        final Generator generator = new StandardGenerator();
        generator.init(poolParams);
        generatorManager.generate(pool, generator);
        return pool;
    }
}

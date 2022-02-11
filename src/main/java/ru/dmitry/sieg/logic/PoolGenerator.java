package ru.dmitry.sieg.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.entity.PoolParams;
import ru.dmitry.sieg.logic.generator.*;

@Component
public class PoolGenerator {

    @Autowired
    private GeneratorManager generatorManager;

    public Pool generate(final PoolParams poolParams) {

        final Pool pool = new Pool(poolParams);

        final Generator generator = new JsonGenerator("[" +
                "[12, 12, 12, 12, 12]," +
                "[12, 11, 11,  9, 12]," +
                "[12, 12, 12, 11, 12]," +
                "[12, 12, 12, 12, 12]" +
                "]");
        generator.init(poolParams);
        generatorManager.generate(pool, generator);
        return pool;
    }
}

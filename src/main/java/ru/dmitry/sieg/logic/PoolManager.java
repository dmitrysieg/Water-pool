package ru.dmitry.sieg.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.entity.PoolParams;

@Component
public class PoolManager {

    @Autowired
    private PoolGenerator poolGenerator;

    @Autowired
    private PoolSolver poolSolver;

    public Pool getPool(final PoolParams poolParams) {
        final Pool pool = poolGenerator.generate(poolParams);
        final Pool result = poolSolver.solve(pool);
        return result;
    }
}

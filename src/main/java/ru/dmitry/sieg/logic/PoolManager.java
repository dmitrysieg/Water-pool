package ru.dmitry.sieg.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.entity.PoolParams;
import ru.dmitry.sieg.logic.solver.SolverContext;

@Component
public class PoolManager {

    @Autowired
    private PoolGenerator poolGenerator;

    public SolverContext getPool(final PoolParams poolParams) {

        final Pool pool = poolGenerator.generate(poolParams);

        final PoolSolver poolSolver = new PoolSolver(pool);
        poolSolver.solve(pool);
        return poolSolver.getContext();
    }
}

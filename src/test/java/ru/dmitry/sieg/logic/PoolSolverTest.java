package ru.dmitry.sieg.logic;

import org.junit.Assert;
import org.junit.Test;
import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.entity.PoolParams;
import ru.dmitry.sieg.logic.generator.Generator;
import ru.dmitry.sieg.logic.generator.GeneratorManager;
import ru.dmitry.sieg.logic.generator.JsonGenerator;

import java.util.Arrays;

public class PoolSolverTest {

    @Test
    public void cornerShape_differentDepth() {

        final PoolParams poolParams = new PoolParams();
        poolParams.setWidth(5);
        poolParams.setHeight(4);
        poolParams.setDepth(100);

        final Pool pool = new Pool(poolParams);

        final Generator generator = new JsonGenerator("[" +
                "[12, 12, 12, 12, 12]," +
                "[12, 11, 11,  9, 12]," +
                "[12, 12, 12, 11, 12]," +
                "[12, 12, 12, 12, 12]" +
                "]");
        generator.init(poolParams);

        final GeneratorManager generatorManager = new GeneratorManager();
        generatorManager.generate(pool, generator);

        final PoolSolver poolSolver = new PoolSolver(pool);
        poolSolver.solve(pool);

        Assert.assertTrue(Arrays.deepEquals(pool.getWaterHeight(), new int[][]{
                new int[]{-1, -1, -1, -1, -1},
                new int[]{-1, 12, 12, 12, -1},
                new int[]{-1, -1, -1, 12, -1},
                new int[]{-1, -1, -1, -1, -1},
        }));
    }
}

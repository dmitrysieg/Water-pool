package ru.dmitry.sieg.logic;

import org.junit.Assert;
import org.junit.Test;
import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.entity.PoolParams;

import java.util.Arrays;

public class PoolSolverTest {

    @Test
    public void cornerShape_differentDepth() {

        final PoolParams poolParams = new PoolParams();
        poolParams.setWidth(5);
        poolParams.setHeight(4);
        poolParams.setDepth(100);

        final Pool pool = new Pool(poolParams);

        pool.setPoolHeight(new int[][]{
                new int[]{12, 12, 12, 12, 12},
                new int[]{12, 11, 11,  9, 12},
                new int[]{12, 12, 12, 11, 12},
                new int[]{12, 12, 12, 12, 12}
        });

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

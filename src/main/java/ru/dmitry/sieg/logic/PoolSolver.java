package ru.dmitry.sieg.logic;

import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.logic.generator.GeneratorFunction;
import ru.dmitry.sieg.logic.solver.SolverContext;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Deque;
import java.util.LinkedList;

public class PoolSolver implements GeneratorFunction {

    private final SolverContext context;
    private final Pool pool;

    public PoolSolver(final Pool pool) {
        this.context = new SolverContext(pool);
        this.pool = pool;
    }

    public SolverContext getContext() {
        return context;
    }

    public void solve(final Pool pool) {

        if (pool.isHasWater()) {
            // do nothing.
            return;
        }

        pool.iterate(context.getMaxFinder());
        pool.iterateAndSetWaterHeight(this);
        pool.setHasWater(true);
    }

    /**
     * Solve single column
     */
    @Override
    public int generate(final int height, final int x, final int y) {

        // guaranteed to be poured out
        if (height == this.context.getMaxFinder().getMaxHeight()) {
            return -1;
        }

        // ***
        // Rewritten from JS, todo rewrite in java style
        // ***

        // start testing "waterproof" from pool height + 1, because there's firm ground at pool height and can't be water level.
        int lowest = height + 1;
        // there can be no water level above max pool height (nothing can stop it from pouring to lower level).
        int highest = this.context.getMaxFinder().getMaxHeight();

        int lastWaterLevel = -1;

        while (lowest <= highest) {

            int center = lowest + (highest - lowest) / 2;

            if (pool.isBoundary(x, y) || findBoundary(x, y, center)) {
                highest = center - 1;
            } else {
                lowest = center + 1;
                lastWaterLevel = center;
            }
        }
        return lastWaterLevel;
    }

    private boolean findBoundary(final int x, final int y, final int h) {

        final boolean[][] passed = new boolean[pool.getHeight()][pool.getWidth()];

        final Deque<int[]> stack = new LinkedList<>();
        stack.push(new int[]{x, y});
        while (!stack.isEmpty()) {
            final int[] curr = stack.pop();

            if (pool.isBoundary(curr[0], curr[1])) {
                return true;
            }

            passed[curr[1]][curr[0]] = true;
            for (final int[] next : this.getNext(curr[0], curr[1])) {
                context.doIncrementCounter();
                if (pool.comparePoolHeight(next[0], next[1], h) < 0 && !passed[next[1]][next[0]]) {
                    stack.push(next);
                }
            }
        }
        return false;
    }

    private Iterable<int[]> getNext(final int x, final int y) {
        final Collection<int[]> next = new ArrayList<>();
        if (x > 0)                      next.add(new int[]{x - 1, y    });
        if (x < pool.getWidth() - 1)    next.add(new int[]{x + 1, y    });
        if (y > 0)                      next.add(new int[]{x    , y - 1});
        if (y < pool.getHeight() - 1)   next.add(new int[]{x    , y + 1});
        return next;
    }
}

package ru.dmitry.sieg.logic.solver;

import lombok.Getter;
import ru.dmitry.sieg.entity.Pool;

public class SolverContext {

    private final Pool pool;
    private final MaxFinder maxFinder;

    private int opCounter;

    public SolverContext(final Pool pool) {
        this.pool = pool;
        this.maxFinder = new MaxFinder();
    }

    public void doIncrementCounter() {
        opCounter++;
    }

    public Pool getPool() {
        return pool;
    }

    public int getOpCounter() {
        return opCounter;
    }

    public MaxFinder getMaxFinder() {
        return maxFinder;
    }

    @Getter
    public static class MaxFinder implements Pool.Iterator {

        private int minHeight;
        private int maxHeight;

        public MaxFinder() {
            this.minHeight = Integer.MAX_VALUE;
            this.maxHeight = -1;
        }

        @Override
        public void apply(final int height, final int x, final int y) {
            if (this.minHeight > height) {
                this.minHeight = height;
            }
            if (this.maxHeight < height) {
                this.maxHeight = height;
            }
        }
    }
}

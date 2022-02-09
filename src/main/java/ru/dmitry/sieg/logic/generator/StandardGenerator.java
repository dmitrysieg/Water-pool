package ru.dmitry.sieg.logic.generator;

import ru.dmitry.sieg.entity.PoolParams;

import java.util.Random;

public class StandardGenerator implements Generator {

    private int depth;
    private Random random;

    @Override
    public void init(final PoolParams poolParams) {
        this.depth = poolParams.getDepth();
        this.random = new Random(System.currentTimeMillis());
    }

    @Override
    public int generate(int height, int x, int y) {
        return 1 + random.nextInt(this.depth);
    }
}

package ru.dmitry.sieg.logic.generator;

import ru.dmitry.sieg.entity.PoolParams;

public class FilteringGenerator implements Generator {

    private int blur;

    public FilteringGenerator(final int blur) {
        this.blur = blur;
    }

    @Override
    public void init(final PoolParams poolParams) {

    }

    @Override
    public int generate(int height, int x, int y) {
        return 0;
    }
}

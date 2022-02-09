package ru.dmitry.sieg.logic.generator;

import ru.dmitry.sieg.entity.PoolParams;

public interface Generator extends GeneratorFunction {

    void init(final PoolParams poolParams);
}

package ru.dmitry.sieg.logic.generator;

@FunctionalInterface
public interface GeneratorFunction {

    int generate(final int height, final int x, final int y);
}

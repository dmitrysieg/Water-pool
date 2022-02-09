package ru.dmitry.sieg.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import ru.dmitry.sieg.logic.generator.GeneratorFunction;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Pool {

    private int[][] poolHeight;
    private int[][] waterHeight;
    private boolean hasWater;

    public Pool(final PoolParams poolParams) {
        this.setPoolHeight(new int[poolParams.getHeight()][poolParams.getWidth()]);
        this.setWaterHeight(new int[poolParams.getHeight()][poolParams.getWidth()]);
    }

    public void cleanup() {
        this.iterateAndSetWaterHeight((h, x, y) -> -1);
    }

    public void iterate(final Iterator iterator) {
        for (int i = 0; i < waterHeight.length; i++) {
            for (int j = 0; j < waterHeight[i].length; j++) {
                iterator.apply(waterHeight[i][j], j, i);
            }
        }
    }

    public void iterateAndSetWaterHeight(final GeneratorFunction function) {
        this.iterate((h, x, y) -> {
            this.waterHeight[y][x] = function.generate(h, x, y);
        });
    }

    public void iterateAndSetPoolHeight(final GeneratorFunction function) {
        this.iterate((h, x, y) -> {
            this.poolHeight[y][x] = function.generate(h, x, y);
        });
    }

    @FunctionalInterface
    public interface Iterator {
        void apply(final int height, final int x, final int y);
    }
}

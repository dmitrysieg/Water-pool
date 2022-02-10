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

    public int getHeight() {
        return poolHeight != null ? poolHeight.length : 0;
    }

    public int getWidth() {
        return (poolHeight != null && poolHeight.length > 0 && poolHeight[0] != null) ? poolHeight[0].length : 0;
    }

    public Pool(final PoolParams poolParams) {
        this.setPoolHeight(new int[poolParams.getHeight()][poolParams.getWidth()]);
        this.setWaterHeight(new int[poolParams.getHeight()][poolParams.getWidth()]);
    }

    public void cleanup() {
        this.iterateAndSetWaterHeight((h, x, y) -> -1);
    }

    public void iterate(final Iterator iterator) {
        for (int i = 0; i < poolHeight.length; i++) {
            for (int j = 0; j < poolHeight[i].length; j++) {
                iterator.apply(poolHeight[i][j], j, i);
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

    public boolean isBoundary(final int x, final int y) {
        return y == 0 || y == this.getHeight() - 1 || x == 0 || x == this.getWidth() - 1;
    }

    /**
     * @return Positive, if pool height > h
     *         Zero,     if pool height = h
     *         Negative, if pool height < h
     */
    public int comparePoolHeight(final int x, final int y, final int h) {
        return this.poolHeight[y][x] - h;
    }

    @FunctionalInterface
    public interface Iterator {
        void apply(final int height, final int x, final int y);
    }
}

package ru.dmitry.sieg.logic.generator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import ru.dmitry.sieg.entity.PoolParams;

import java.util.Random;

public class FilteringGenerator implements Generator {

    private final int blur;

    private transient int height;
    private transient int width;

    private transient int[][] map;
    private transient int[][] tmpMap;

    public FilteringGenerator(final int blur) {
        this.blur = blur;
    }

    private void cycle(final int offset, final Action action) {
        for (int j = offset; j < this.height - offset; j++) {
            for (int i = offset; i < this.width - offset; i++) {
                action.call(i, j);
            }
        }
    }

    private void cycleOutline(final int offset, final Action action) {

        for (int j = 0; j < offset; j++) {
            for (int i = 0; i < this.width; i++) {
                action.call(i, j);
                action.call(i, this.height - 1 - j);
            }
        }

        for (int j = offset; j < this.height - offset; j++) {
            for (int i = 0; i < offset; i++) {
                action.call(i, j);
                action.call(this.width - 1 - i, j);
            }
        }
    }

    @Override
    public void init(final PoolParams poolParams) {

        this.height = poolParams.getHeight();
        this.width = poolParams.getWidth();

        // arrays init
        this.map = new int[height][width];
        this.tmpMap = new int[height][width];

        // randomize
        final Random random = new Random(System.currentTimeMillis());
        this.cycle(0, (i, j) -> {
            this.map[j][i] = 1 + random.nextInt(poolParams.getDepth());
            this.tmpMap[j][i] = this.map[j][i];
        });

        // blur
        final Avg avg = new Avg();

        for (int b = 0; b < this.blur; b++) {
            this.cycle(1, (i, j) -> {
                this.tmpMap[j][i] = this.mask(i, j);
            });
            this.cycle(1, (i, j) -> {
                this.map[j][i] = this.tmpMap[j][i];

                // calc average
                avg.avg += this.map[j][i];
            });
        }

        // smoothing edges
        avg.avg /= (height - 1) * (width - 1) * this.blur;
        this.cycleOutline(5, (i, j) -> {
            final double ratio = this.map[j][i] / avg.avg;
            if (ratio >= 1.08 || ratio <= 0.92) {
                this.map[j][i] = (int) Math.floor(avg.avg);
            }
        });

        // cutting extra height
        final MinMax minMax = new MinMax(poolParams.getDepth(), 0);

        this.cycle(0, (i, j) -> {
            if (this.map[j][i] < minMax.min) {
                minMax.min = this.map[j][i];
            }
            if (this.map[j][i] > minMax.max) {
                minMax.max = this.map[j][i];
            }
        });

        this.cycle(0, (i, j) -> {
            this.map[j][i] -= minMax.min - 1;
        });

        // todo is this necessary?
        minMax.min = 1;
        minMax.max = minMax.max - minMax.min + 1;
    }

    private int mask(final int i, final int j) {
        return this.mask8(i, j);
    }

    private int mask4(final int i, final int j) {
        final double sum = this.map[j - 1][i] +
                           this.map[j + 1][i] +
                           this.map[j][i - 1] +
                           this.map[j][i + 1];
        return (int) Math.floor(sum / 4);
    }

    private int mask8(final int i, final int j) {
        final double sum = this.map[j - 1][i - 1] +
                           this.map[j    ][i - 1] +
                           this.map[j + 1][i - 1] +
                           this.map[j - 1][i    ] +
                           this.map[j + 1][i    ] +
                           this.map[j - 1][i + 1] +
                           this.map[j    ][i + 1] +
                           this.map[j + 1][i + 1];
        return (int) Math.floor(sum / 8);
    }

    private int stohasticMask(final Random random, final int i, final int j) {
        final int[] sums = new int[8];
        sums[0] = (this.map[j - 1][i - 1]);
        sums[1] = (sums[0] + this.map[j    ][i - 1]);
        sums[2] = (sums[1] + this.map[j + 1][i - 1]);
        sums[3] = (sums[2] + this.map[j - 1][i    ]);
        sums[4] = (sums[3] + this.map[j + 1][i    ]);
        sums[5] = (sums[4] + this.map[j - 1][i + 1]);
        sums[6] = (sums[5] + this.map[j    ][i + 1]);
        sums[7] = (sums[6] + this.map[j + 1][i + 1]);
        final int index = random.nextInt(8);
        return sums[index] / (index + 1);
    }

    @Override
    public int generate(int height, int x, int y) {
        return map[y][x];
    }

    private static class Avg {

        @Getter
        private double avg;
    }

    @AllArgsConstructor
    private static class MinMax {

        @Getter
        private int min;

        @Getter
        private int max;
    }

    @FunctionalInterface
    private interface Action {
        void call(final int x, final int y);
    }

    @Override
    public String toString() {
        return "FilteringGenerator{" +
                "blur=" + blur +
                '}';
    }
}

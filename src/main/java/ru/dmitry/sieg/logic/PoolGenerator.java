package ru.dmitry.sieg.logic;

import org.springframework.stereotype.Component;
import ru.dmitry.sieg.entity.Pool;
import ru.dmitry.sieg.entity.PoolParams;

@Component
public class PoolGenerator {

    public Pool generate(final PoolParams poolParams) {
        return new Pool(); // todo
    }
}

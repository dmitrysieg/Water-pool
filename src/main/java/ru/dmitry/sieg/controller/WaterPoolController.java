package ru.dmitry.sieg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.dmitry.sieg.entity.PoolParams;
import ru.dmitry.sieg.logic.PoolManager;
import ru.dmitry.sieg.logic.solver.SolverContext;

@RestController
public class WaterPoolController {

    @Autowired
    private PoolManager poolManager;

    @PostMapping("/pool")
    public SolverContext getPool(@RequestBody final PoolParams poolParams) {
        return poolManager.getPool(poolParams);
    }
}

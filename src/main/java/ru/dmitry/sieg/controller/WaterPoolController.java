package ru.dmitry.sieg.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.dmitry.sieg.entity.PoolParams;
import ru.dmitry.sieg.logic.PoolManager;
import ru.dmitry.sieg.logic.solver.SolverContext;

@RestController
public class WaterPoolController {

    private static final Logger logger = LoggerFactory.getLogger(WaterPoolController.class);

    @Autowired
    private PoolManager poolManager;

    @PostMapping("/pool")
    public SolverContext getPool(@RequestBody final PoolParams poolParams) {
        logger.debug("getPool(): {}", poolParams);
        return poolManager.getPool(poolParams);
    }
}

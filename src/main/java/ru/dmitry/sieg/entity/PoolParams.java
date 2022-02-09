package ru.dmitry.sieg.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PoolParams {

    private String type;
    private int height;
    private int width;
    private int depth;
}

package ru.dmitry.sieg.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Pool {

    private int[][] poolHeight;
    private int[][] waterHeight;
}

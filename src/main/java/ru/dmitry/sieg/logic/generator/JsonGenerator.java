package ru.dmitry.sieg.logic.generator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ru.dmitry.sieg.entity.PoolParams;

/**
 * Example:
 * final Generator generator = new JsonGenerator("[" +
 *         "[12, 12, 12, 12, 12]," +
 *         "[12, 11, 11,  9, 12]," +
 *         "[12, 12, 12, 11, 12]," +
 *         "[12, 12, 12, 12, 12]" +
 *         "]");
 */
public class JsonGenerator implements Generator {

    private final int map[][];

    public JsonGenerator(final String json) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            this.map = mapper.readValue(json, int[][].class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Can't create JsonGenerator from string", e);
        }
    }

    @Override
    public void init(final PoolParams poolParams) {
        // do nothing
    }

    @Override
    public int generate(int height, int x, int y) {
        return map[y][x];
    }
}
